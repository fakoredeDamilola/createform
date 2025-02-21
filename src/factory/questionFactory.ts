import { QuestionType } from "../utils/constants";
import { BooleanChoice } from "./classes/BooleanChoice";
import FillTheGap from "./classes/FillTheGap";
import LongText from "./classes/LongText";
import MultipleChoice from "./classes/MultipleChoice";
import ShortText from "./classes/ShortText";

export class QuestionFactory {
  static createNewQuestion(
    questionType: QuestionType,
    questionInfo: {
      questionFormat: "Text" | "Video";
      questionNumber: number;
      formId: string;
      questionId: string;
    }
  ) {
    const { questionFormat, questionId, formId, questionNumber } = questionInfo;
    switch (questionType) {
      case QuestionType.long_text:
        return new LongText(
          formId,
          questionType,
          questionId,
          questionFormat,
          questionNumber
        );
      case QuestionType.short_text:
        return new ShortText(
          formId,
          questionType,
          questionId,
          questionFormat,
          questionNumber
        );
      case QuestionType.multiple_choice:
        return new MultipleChoice(
          formId,
          questionType,
          questionId,
          questionFormat,
          questionNumber,
          []
        );

      case QuestionType.boolean:
        return new BooleanChoice(
          formId,
          questionType,
          questionId,
          questionFormat,
          questionNumber,
          []
        );
      case QuestionType.fill_the_gap:
        return new FillTheGap(
          formId,
          questionType,
          questionId,
          questionFormat,
          questionNumber,
          []
        );
    }
  }
}
