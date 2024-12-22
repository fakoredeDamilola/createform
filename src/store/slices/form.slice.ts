import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IForm } from "../../interfaces/IForm";
import {
  createAQuestionSkeleton,
  createNewOptionSkeleton,
  getNextEnumValue,
  renumberQuestions,
} from "../../utils/functions";
import { BooleanLabel, OptionLabel, QuestionType } from "../../utils/constants";
import { IQuestion } from "../../interfaces/IQuestion";
import { IFormSetting } from "../../interfaces/IFormSetting";
import { IResponseDetail } from "../../interfaces/IResponseDetail";
import { IAnswer } from "../../interfaces/IAnswer";
import { IQuestionWithAnswer } from "../../interfaces/IQuestionWithAnswer";

interface FormState {
  forms: IForm[];
  selectedQuestion: IQuestion;
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
  formString: "https://0983993.typeform.com/g",
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
    setForm: (state, action: PayloadAction<{ form: IForm }>) => {
      state.form = action.payload.form;
      if (state.form.questions?.length > 0) {
        state.selectedQuestion = state.form.questions[0];
      }
    },
    createNewForm: (state, action: PayloadAction<{ newForm: IForm }>) => {
      const { newForm } = action.payload;
    },
    updateFormName: (state, action: PayloadAction<{ formName: string }>) => {
      const { formName } = action.payload;
      if (state.form) {
        state.form.formName = formName;
      }
    },
    updateFormDetails: (
      state,
      action: PayloadAction<{
        formSettings: IFormSetting;
      }>
    ) => {
      const { formSettings } = action.payload;

      if (state.form) {
        state.form.formSettings = formSettings;
      }
    },
    addNewQuestionToForm: (
      state,
      action: PayloadAction<{ questionType: QuestionType }>
    ) => {
      console.log("here");
      const { questionType } = action.payload;
      const form = state.form;
      if (form) {
        const newQuestionNumber = form.noOfQuestions + 1;
        const newQuestion = createAQuestionSkeleton(
          questionType,
          form._id,
          newQuestionNumber
        );
        console.log({ newQuestion });
        if (newQuestion) {
          if (questionType === QuestionType.multiple_choice) {
            const optionLabel = getNextEnumValue(OptionLabel);
            const newOption = createNewOptionSkeleton(optionLabel);
            if ("options" in newQuestion) {
              newQuestion.options = [newOption];
            }
          } else if (questionType === QuestionType.boolean) {
            const booleanOptions = [
              createNewOptionSkeleton(BooleanLabel.YES, "YES"),
              createNewOptionSkeleton(BooleanLabel.NO, "NO"),
            ];
            if ("options" in newQuestion) {
              newQuestion.options = booleanOptions;
            }
          }
          form.questions.push(newQuestion);
          form.noOfQuestions++;
          state.selectedQuestion = newQuestion;
        }
      }
    },
    selectAQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
      const { questionId } = action.payload;

      const form = state.form;
      const findQuestion = form?.questions.find(
        (question) => question.questionId === questionId
      );

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
      }>
    ) => {
      const { questionId, key, value } = action.payload;

      const form = state.form;
      const findQuestion = form?.questions.find(
        (question) => question.questionId === questionId
      );

      if (findQuestion) {
        (findQuestion as unknown as Record<string, string | boolean>)[key] =
          value;
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
        (question) => question.questionId === questionId
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
        (question) => question.questionId === questionId
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
          console.log(question.options);
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
    deleteQuestion: (
      state,
      action: PayloadAction<{
        questionId: string;
      }>
    ) => {
      const { questionId } = action.payload;

      const form = state.form;
      const questionIndex = form?.questions.findIndex(
        (question) => question.questionId === questionId
      );

      if (form && questionIndex) {
        form.questions.splice(questionIndex, 1);
        const questions = renumberQuestions(form.questions);
        console.log({ questions });
        form.questions = questions;
      }
    },
  },
});

export const {
  setOpenPublishModal,
  createNewForm,
  updateFormName,
  updateFormDetails,
  addNewQuestionToForm,
  updateQuestionInfo,
  addNewOptionToMultipleChoice,
  updateOptionInMultipleChoice,
  removeQuestionOption,
  duplicateQuestion,
  selectAQuestion,
  deleteQuestion,
  setForm,
  addResultsToQuestions,
} = formSlice.actions;
export default formSlice.reducer;
