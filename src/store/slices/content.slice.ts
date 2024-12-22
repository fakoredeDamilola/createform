import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForm } from "../../interfaces/IForm";
import { IAnswer } from "../../interfaces/IAnswer";
import { getResponseArrayFromForm } from "../../utils/functions";

interface ContentState {
  form: IForm;
  answers: IAnswer[];
  numberIndex: number;
  startResponding: boolean;
  timeStarted: null | number;
}

const initialState: ContentState = {
  form: {} as IForm,
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
      state.answers = responseArray;
      state.numberIndex = 0;
    },
    moveToNextOrPrevQuestion: (state, action: PayloadAction<number>) => {
      state.numberIndex = action.payload;
    },
    updateAnswerResponse: (
      state,
      action: PayloadAction<{ responseText: string }>
    ) => {
      const { responseText } = action.payload;
      const index = state.numberIndex;

      state.answers = state.answers.map((answer, i) =>
        i === index
          ? {
              ...answer,
              textResponse: responseText,
              answeredQuestion: responseText.length ? true : false,
            }
          : answer
      );
    },
    setStartResponding: (state) => {
      if (!state.startResponding) {
        state.startResponding = true;
      }
    },
    setTimeStarted: (state) => {
      if (!state.timeStarted) {
        state.timeStarted = new Date().getTime();
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
  },
});

export const {
  getFormDetails,
  moveToNextOrPrevQuestion,
  updateAnswerResponse,
  selectAnswerOption,
  setStartResponding,
  setTimeStarted,
} = contentSlice.actions;
export default contentSlice.reducer;
