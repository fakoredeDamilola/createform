import { IOption } from "../../interfaces/IOption";
import { QuestionType } from "../../utils/constants";
import { QuestionSkeleton } from "./Question";

export default class MultipleChoice extends QuestionSkeleton {
  questionFormat: "Text" | "Video";
  questionNumber: number;
  options: IOption[];

  constructor(
    formId: string,
    questionType: QuestionType,
    questionId: string,
    questionFormat: "Text" | "Video",
    questionNumber: number,
    options: IOption[]
  ) {
    super(formId, questionType, questionId);
    this.questionFormat = questionFormat;
    this.questionNumber = questionNumber;
    this.options = options;
  }
}
