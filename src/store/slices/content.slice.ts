import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForm } from "../../interfaces/IForm";
import { IAnswer } from "../../interfaces/IAnswer";
import { getResponseArrayFromForm } from "../../utils/functions";
import { IResponseDetail } from "../../interfaces/IResponseDetail";

interface ContentState {
  form: IForm;
  formViewingMode: boolean;
  response: IResponseDetail;
  answers: IAnswer[];
  numberIndex: number;
  startResponding: boolean;
  timeStarted: null | number;
}

const initialState: ContentState = {
  form: {} as IForm,
  response: {} as IResponseDetail,
  formViewingMode: false,
  answers: [] as IAnswer[],
  numberIndex: 0,
  startResponding: false,
  timeStarted: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    getFormDetails: (state, action: PayloadAction<{ form: IForm }>) => {
      const responseArray = getResponseArrayFromForm(
        action.payload.form.questions
      );
      state.form = action.payload.form;
      state.formViewingMode = false;
      state.answers = responseArray;
      state.numberIndex = 0;
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
      state.answers = state.answers.map((answer, i) =>
        i === index ? { ...answer, optionId, answeredQuestion: true } : answer
      );
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
} = contentSlice.actions;
export default contentSlice.reducer;
