import { QuestionType } from "../../utils/constants";
import { QuestionSkeleton } from "./Question";

export default class LongText extends QuestionSkeleton {
  questionFormat: "Text" | "Video";
  questionDescription: string;
  required: boolean;
  characterLimit: boolean;
  questionNumber: number;
  questionText: string;

  constructor(
    questionFormat: "Text" | "Video",
    questionDescription: string,
    required: boolean,
    characterLimit: boolean,
    questionNumber: number,
    questionText: string,
    formId: string,
    questionType: QuestionType,
    questionId: string
  ) {
    super(formId, questionType, questionId);
    this.questionFormat = questionFormat;
    this.questionDescription = questionDescription;
    this.required = required;
    this.characterLimit = characterLimit;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
  }
}
