import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IForm } from "../../interfaces/IForm";
import {
  createNewOptionSkeleton,
  createNewQuestionAnswer,
  getNextEnumValue,
  updateStartPageInstruction,
} from "../../utils/functions";
import {
  fillTheGapId,
  FormStaticType,
  OptionLabel,
  QuestionType,
} from "../../utils/constants";
import { IQuestion } from "../../interfaces/IQuestion";
import { IFormSetting } from "../../interfaces/IFormSetting";
import { IResponseDetail } from "../../interfaces/IResponseDetail";
import { IAnswer } from "../../interfaces/IAnswer";
import { IQuestionWithAnswer } from "../../interfaces/IQuestionWithAnswer";
import { IStaticPage } from "../../interfaces/IStaticPage";

interface FormState {
  forms: IForm[];
  selectedQuestion: IQuestion | IStaticPage;
  openPublishModal: boolean;
  formString: string;
  form: IForm;
  questionsWithAnswers: IQuestionWithAnswer[];
  responses: IResponseDetail[];
}

const initialState: FormState = {
  forms: [],
  selectedQuestion: {} as IQuestion,
  openPublishModal: false,
  formString: `https://createform-neon.vercel.app/g`,
  form: {} as IForm,
  questionsWithAnswers: [],
  responses: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setOpenPublishModal: (state, action: PayloadAction<boolean>) => {
      if (state.form) {
        state.openPublishModal = action.payload;
      }
    },
    createNewFormEncryption: (state, action: PayloadAction<string>) => {
      state.form.encryptionDetails.push(action.payload);
    },
    removeValueFromEncryption: (state, action: PayloadAction<number>) => {
      state.form.encryptionDetails.splice(action.payload, 1);
    },
    setForm: (state, action: PayloadAction<{ form: IForm }>) => {
      const { form } = action.payload;
      state.form = form;
      if (state.form.questions?.length > 0) {
        state.selectedQuestion = state.form.questions[0];
      }
    },
    updateFormName: (state, action: PayloadAction<{ formName: string }>) => {
      const { formName } = action.payload;
      if (state.form) {
        state.form.formName = formName;
      }
    },
    updateFormSettingDetails: (
      state,
      action: PayloadAction<{
        formSettings: IFormSetting;
      }>
    ) => {
      const { formSettings } = action.payload;
      if (state.form) {
        const updatedFormSettings = { ...formSettings };
        if (updatedFormSettings.popQuiz) {
          updatedFormSettings.addAnswerToQuestion = true;
        }

        state.form.formSettings = updatedFormSettings;

        const instructions = updateStartPageInstruction(
          updatedFormSettings,
          state.form.totalFormTimeLimit
        );
        if (instructions.length > 0) {
          state.form.formStartPage.instructions = instructions;
        }
        if (formSettings.showStartPage) {
          state.form.formStartPage.showPage = true;
          state.form.formStartPage.pageTitle = "Welcome";
        }
      }
    },

    updateFormDetails: (
      state,
      action: PayloadAction<{
        key: string;
        value: string | boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      const form = state.form;
      if (state.form) {
        (form as unknown as Record<string, string | boolean>)[key] = value;
      }
    },
    addNewQuestionToForm: (
      state,
      action: PayloadAction<{ questionInfo: IQuestion }>
    ) => {
      const { questionInfo } = action.payload;
      const form = state.form;
      if (form) {
        form.questions.push(questionInfo);
        form.noOfQuestions++;
        state.selectedQuestion = questionInfo;
      }
    },
    selectAQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
      const { questionId } = action.payload;

      const form = state.form;
      const findQuestion = [
        ...form.questions,
        form.formEndPage,
        form.formStartPage,
      ].find((question) => question.questionId === questionId);

      if (findQuestion) {
        state.selectedQuestion = findQuestion;
      }
    },

    updateQuestionInfo: (
      state,
      action: PayloadAction<{
        questionId: string;
        key: string;
        value: string | boolean;
        dashPositions?: { start: number; stop: number }[];
      }>
    ) => {
      const { questionId, key, value, dashPositions } = action.payload;
      const form = state.form;
      const findQuestion = form?.questions.find(
        (question) => question.questionId === questionId
      );

      if (findQuestion) {
        if (key === "questionText" && typeof value === "string") {
          (findQuestion as unknown as Record<string, string[] | boolean>)[key] =
            [value];
          if (dashPositions && dashPositions?.length > 0) {
            findQuestion.dashPositions = dashPositions;
          }
        } else {
          (findQuestion as unknown as Record<string, string | boolean>)[key] =
            value;
        }

        if (key === "timeLimit") {
          if (typeof value === "boolean") {
            findQuestion.required = value;
          }
        }
      }
    },
    addDashToFillTheGap: (
      state,
      action: PayloadAction<{
        questionId: string;
      }>
    ) => {
      const { questionId } = action.payload;

      const form = state.form;
      const findQuestion = form?.questions.find(
        (question) => question.questionId === questionId
      );

      if (findQuestion) {
        if (findQuestion.questionType === QuestionType.fill_the_gap) {
          findQuestion.questionText.push(fillTheGapId);
        }
      }
    },
    updateStaticPageInfo: (
      state,
      action: PayloadAction<{
        key: string;
        value: string | boolean;
        staticPage: string;
      }>
    ) => {
      const { key, value, staticPage } = action.payload;

      const findPage =
        staticPage === FormStaticType.START
          ? state.form.formStartPage
          : state.form.formEndPage;

      if (findPage) {
        (findPage as unknown as Record<string, string | boolean>)[key] = value;
      }
    },
    addNewOptionToMultipleChoice: (
      state,
      action: PayloadAction<{
        questionId: string;
      }>
    ) => {
      const { questionId } = action.payload;
      const form = state.form;
      const question = form?.questions.find(
        (question) => question._id === questionId
      );
      if (
        question?.questionType === QuestionType.multiple_choice &&
        question?.options
      ) {
        const currentOptionLabel = question?.options[
          question?.options?.length - 1
        ]?.optionLabel as OptionLabel;
        const nextOptionLabel = getNextEnumValue(
          OptionLabel,
          currentOptionLabel
        );
        const newOption = createNewOptionSkeleton(nextOptionLabel);
        question.options = [...question.options, newOption];
        if (form) {
          form.questions = [...form.questions];
        }
      }
    },
    addResultsToQuestions: (
      state,
      action: PayloadAction<{
        questions: IQuestion[];
        responses: IResponseDetail[];
      }>
    ) => {
      const { questions, responses } = action.payload;
      const answersMap: IAnswer[] = [];
      responses.forEach((response) => {
        const updateResponses = response.answers.map((res) => ({
          ...res,
          dateSubmitted: response.submissionDate,
          createdAt: response.createdAt,
        }));
        answersMap.push(...updateResponses);
      });
      const questionsWithAnswers: IQuestionWithAnswer[] = questions.map(
        (question: IQuestion) => ({
          question,
          answers: answersMap.filter((ans) => ans.questionId === question._id),
        })
      );
      state.responses = responses;
      state.questionsWithAnswers = questionsWithAnswers;
    },
    updateOptionInMultipleChoice: (
      state,
      action: PayloadAction<{
        questionId: string;
        optionId: string;
        value: string;
        select: boolean;
      }>
    ) => {
      const { questionId, value, optionId, select } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question._id === questionId
      );
      if (
        (question?.questionType === QuestionType.multiple_choice ||
          question?.questionType === QuestionType.boolean) &&
        question?.options
      ) {
        const option = question.options.find(
          (option) => option.optionId === optionId
        );
        const optionIndex = question.options.findIndex(
          (option) => option.optionId === optionId
        );
        if (option && optionIndex !== -1) {
          option.optionText = value;
          if (select) {
            question.options = question.options.map((option) => ({
              ...option,
              selectedOption: false,
            }));
            option.selectedOption = select;
          }
          question.options.splice(optionIndex, 1, option);
          if (form) {
            form.questions = [...form.questions];
          }
        }
      }
    },
    removeQuestionOption: (
      state,
      action: PayloadAction<{
        questionId: string;
        optionId: string;
      }>
    ) => {
      const { questionId, optionId } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question.questionId === questionId
      );
      if (
        question?.questionType === QuestionType.multiple_choice &&
        question?.options
      ) {
        const optionIndex = question.options.findIndex(
          (option) => option.optionId === optionId
        );
        if (optionIndex !== -1) {
          question.options.splice(optionIndex, 1);
          if (form) {
            form.questions = [...form.questions];
          }
        }
      }
    },
    addNewOptionsValue: (
      state,
      action: PayloadAction<{ optionText: string; questionId: string }>
    ) => {
      const { questionId, optionText } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question._id === questionId
      );

      if (question) {
        const newOption = createNewOptionSkeleton(1, optionText);

        question.options?.push(newOption);
        state.selectedQuestion = question;
      }
    },
    removeOptionsValue: (
      state,
      action: PayloadAction<{ optionId: string; questionId: string }>
    ) => {
      const { questionId, optionId } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question._id === questionId
      );
      if (question && question.options) {
        const optionIndex = question.options.findIndex(
          (option) => option.optionId === optionId
        );
        if (optionIndex !== -1) {
          question.options?.splice(optionIndex, 1);

          state.selectedQuestion = question;
        }
      }
    },
    selectOptionAsNextAnswer: (
      state,
      action: PayloadAction<{ optionId: string; questionId: string }>
    ) => {
      const { questionId, optionId } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question._id === questionId
      );
      if (question && question.options) {
        const checkIfQuestionAnswerExist = question?.correctAnswer;
        if (checkIfQuestionAnswerExist) {
          question.correctAnswer.answerResults.push(optionId);
        } else {
          const newQuestionAnswer = createNewQuestionAnswer(
            optionId,
            form._id,
            questionId,
            question.questionType
          );
          question.correctAnswer = newQuestionAnswer;
        }
        state.selectedQuestion = question;
      }
    },
    duplicateQuestion: (
      state,
      action: PayloadAction<{
        questionId: string;
      }>
    ) => {
      const { questionId } = action.payload;

      const form = state.form;
      const question = form?.questions.find(
        (question) => question.questionId === questionId
      );

      if (form && question) {
        const questionNumber = form.questions.length + 1;
        const newQuestion = {
          ...question,
          questionId: uuidv4(),
          questionNumber,
        };
        form.questions.push(newQuestion);
      }
    },
    setQuestions: (
      state,
      action: PayloadAction<{
        questions: IQuestion[];
      }>
    ) => {
      const { questions } = action.payload;

      state.form.questions = questions;
    },

    createOrUpdateQuestionAnswer: (
      state,
      action: PayloadAction<{
        questionAnswer: string;
        formId: string;
        questionId: string;
        questionType: QuestionType;
      }>
    ) => {
      const { formId, questionId, questionAnswer, questionType } =
        action.payload;

      const checkIfQuestionAnswerExist = state.form.questions.find(
        (question) => question._id === questionId
      )?.correctAnswer;
      const selectedQuestionIndex = state.form.questions.findIndex(
        (question) => question._id === questionId
      );
      const selectedQuestionForAnswer =
        state.form.questions[selectedQuestionIndex];
      if (!checkIfQuestionAnswerExist) {
        const newQuestionAnswer = createNewQuestionAnswer(
          questionAnswer,
          formId,
          questionId,
          questionType
        );

        selectedQuestionForAnswer.correctAnswer = newQuestionAnswer;
      } else {
        if (
          checkIfQuestionAnswerExist.questionType ===
          QuestionType.multiple_choice
        ) {
          selectedQuestionForAnswer.correctAnswer?.answerResults.push(
            questionAnswer
          );
        } else {
          selectedQuestionForAnswer.correctAnswer.answerResults = [
            questionAnswer,
          ];
        }

        state.form.questions.splice(
          selectedQuestionIndex,
          1,
          selectedQuestionForAnswer
        );
      }
    },
  },
});

export const {
  setOpenPublishModal,
  updateFormName,
  updateFormSettingDetails,
  addNewQuestionToForm,
  updateQuestionInfo,
  addNewOptionToMultipleChoice,
  updateOptionInMultipleChoice,
  removeQuestionOption,
  duplicateQuestion,
  selectAQuestion,
  setQuestions,
  setForm,
  addResultsToQuestions,
  createOrUpdateQuestionAnswer,
  updateFormDetails,
  createNewFormEncryption,
  removeValueFromEncryption,
  updateStaticPageInfo,
  addDashToFillTheGap,
  addNewOptionsValue,
  removeOptionsValue,
  selectOptionAsNextAnswer,
} = formSlice.actions;
export default formSlice.reducer;
