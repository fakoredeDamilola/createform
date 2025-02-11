import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForm } from "../../interfaces/IForm";
import { IAnswer } from "../../interfaces/IAnswer";
import { IResponseDetail } from "../../interfaces/IResponseDetail";
import { FormItemType, FormStaticType } from "../../utils/constants";

interface ContentState {
  form: IForm;
  formViewingMode: boolean;
  response: IResponseDetail;
  answers: IAnswer[];
  numberIndex: number;
  startResponding: boolean;
  disableNextButton: boolean;
  timeStarted: null | number;
  contentCurrentPage: null | string;
  contentCurrentStaticPage: null | string;
}

const initialState: ContentState = {
  form: {} as IForm,
  response: {} as IResponseDetail,
  formViewingMode: false,
  answers: [] as IAnswer[],
  numberIndex: 0,
  startResponding: false,
  disableNextButton: false,
  timeStarted: null,
  contentCurrentPage: "",
  contentCurrentStaticPage: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    getFormDetails: (
      state,
      action: PayloadAction<{ form: IForm; answers: IAnswer[] }>
    ) => {
      const { form, answers } = action.payload;
      state.form = form;
      state.formViewingMode = false;
      state.answers = answers;
      state.numberIndex = 0;
      if (form.formSettings.popQuiz) {
        state.disableNextButton = true;
      }
      if (form.formStartPage.pageTitle) {
        state.contentCurrentStaticPage = FormStaticType.START;
        state.contentCurrentPage = FormItemType.STATIC;
      } else {
        state.contentCurrentPage = FormItemType.QUESTION;
        state.contentCurrentStaticPage = "";
      }
    },
    changeCurrentContentPage: (
      state,
      action: PayloadAction<{ itemType?: string; staticType?: string }>
    ) => {
      const { itemType, staticType } = action.payload;
      if (itemType) state.contentCurrentPage = itemType;
      if (staticType) state.contentCurrentStaticPage = staticType;
    },
    getResponseDetails: (
      state,
      action: PayloadAction<{ response: IResponseDetail; form: IForm }>
    ) => {
      state.form = action.payload.form;
      state.response = action.payload.response;
      state.formViewingMode = true;
      state.numberIndex = 0;
    },
    updateResponseDetails: (
      state,
      action: PayloadAction<{ response: IResponseDetail }>
    ) => {
      state.response = action.payload.response;
    },
    moveToNextOrPrevQuestion: (state, action: PayloadAction<number>) => {
      state.numberIndex = action.payload;
    },
    setFormViewingMode: (state, action: PayloadAction<boolean>) => {
      state.formViewingMode = action.payload;
    },
    updateAnswerResponse: (
      state,
      action: PayloadAction<{ textResponse?: string; disabled?: boolean }>
    ) => {
      const { textResponse, disabled } = action.payload;
      const index = state.numberIndex;

      state.answers = state.answers.map((answer, i) =>
        i === index
          ? {
              ...answer,
              textResponse: textResponse ?? answer.textResponse,
              answeredQuestion: textResponse?.length ? true : false,
              disabledResponse: disabled ?? false,
            }
          : answer
      );
      if (state.form.formSettings.popQuiz) {
        state.disableNextButton = false;
      }
    },
    updateTimeLeft: (
      state,
      action: PayloadAction<{ timeLeft: number; answerId?: string }>
    ) => {
      const { timeLeft, answerId } = action.payload;
      if (answerId) {
        const findAnswerIndex = state.answers.findIndex(
          (answer) => answer.answerId === answerId
        );
        state.answers[findAnswerIndex].timeLeft = timeLeft;
      }
    },

    setStartResponding: (state) => {
      if (!state.startResponding) {
        state.startResponding = true;
      }
    },
    setTimeStarted: (state, action: PayloadAction<{ timeStarted: number }>) => {
      if (!state.timeStarted) {
        state.timeStarted = action.payload.timeStarted;
      }
    },

    selectAnswerOption: (
      state,
      action: PayloadAction<{
        optionId: string;
      }>
    ) => {
      const { optionId } = action.payload;
      const index = state.numberIndex;
      // state.answers = state.answers.map((answer, i) =>
      //   i === index ? { ...answer, optionId, answeredQuestion: true } : answer
      // );
      state.answers[index] = {
        ...state.answers[index],
        optionId,
        answeredQuestion: true,
      };
      if (state.form.formSettings.popQuiz) {
        state.disableNextButton = false;
      }
    },
    setOptionToFillGap: (
      state,
      action: PayloadAction<{
        optionId: string;
      }>
    ) => {
      const { optionId } = action.payload;
      const index = state.numberIndex;
      const options = state.form.questions[index].options;

      const optionIndex = options?.findIndex(
        (opt) => opt.optionId === optionId
      );
      if (optionIndex && options) {
        const option = options?.splice(optionIndex, 1);
        console.log({ option });
        state.answers[index].optionIds?.push(optionId);
      }
    },
    updateAnswersArray: (
      state,
      action: PayloadAction<{
        correctAnswer: IAnswer;
      }>
    ) => {
      const { correctAnswer } = action.payload;

      const findAnswerIndex = state.answers.findIndex(
        (ans) => ans.answerId === correctAnswer.answerId
      );
      state.answers.splice(findAnswerIndex, 1, correctAnswer);
    },
  },
});

export const {
  getFormDetails,
  moveToNextOrPrevQuestion,
  updateAnswerResponse,
  selectAnswerOption,
  setStartResponding,
  setTimeStarted,
  updateTimeLeft,
  getResponseDetails,
  updateAnswersArray,
  setFormViewingMode,
  updateResponseDetails,
  changeCurrentContentPage,
  setOptionToFillGap,
} = contentSlice.actions;
export default contentSlice.reducer;
