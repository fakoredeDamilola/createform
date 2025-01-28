import { QuestionType } from "../../utils/constants";
import { QuestionSkeleton } from "./Question";

export default class LongText extends QuestionSkeleton {
  questionFormat: "Text" | "Video";
  questionNumber: number;

  constructor(
    formId: string,
    questionType: QuestionType,
    questionId: string,
    questionFormat: "Text" | "Video",
    questionNumber: number
  ) {
    super(formId, questionType, questionId);
    this.questionFormat = questionFormat;
    this.questionNumber = questionNumber;
  }
}
