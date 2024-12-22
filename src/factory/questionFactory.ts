import { IOption } from "../interfaces/IOption";
import { QuestionType } from "../utils/constants";
import LongText from "./classes/LongText";
import MultipleChoice from "./classes/MultipleChoice";

export class QuestionFactory {
  static createNewQuestion(
    questionType: QuestionType,
    questionInfo: {
      questionFormat: "Text" | "Video";
      questionDescription: string;
      required: boolean;
      characterLimit: boolean;
      questionNumber: number;
      questionText: string;
      formId: string;
      questionId: string;
      options?: IOption[];
    }
  ) {
    const {
      questionFormat,
      questionDescription,
      questionId,
      formId,
      questionNumber,
      characterLimit,
      required,
      questionText,
      options,
    } = questionInfo;
    switch (questionType) {
      case QuestionType.long_text:
        return new LongText(
          questionFormat,
          questionDescription,
          required,
          characterLimit,
          questionNumber,
          questionText,
          formId,
          questionType,
          questionId
        );
      case QuestionType.multiple_choice:
        return new MultipleChoice(
          questionFormat,
          questionDescription,
          required,
          characterLimit,
          questionNumber,
          questionText,
          formId,
          questionType,
          questionId,
          options ?? []
        );
    }
  }
}
