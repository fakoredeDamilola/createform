import { IOption } from "../../interfaces/IOption";
import { QuestionType } from "../../utils/constants";
import { QuestionSkeleton } from "./Question";

export default class MultipleChoice extends QuestionSkeleton {
  questionFormat: "Text" | "Video";
  questionDescription: string;
  required: boolean;
  characterLimit: boolean;
  questionNumber: number;
  questionText: string;
  options: IOption[];

  constructor(
    questionFormat: "Text" | "Video",
    questionDescription: string,
    required: boolean,
    characterLimit: boolean,
    questionNumber: number,
    questionText: string,
    formId: string,
    questionType: QuestionType,
    questionId: string,
    options: IOption[]
  ) {
    super(formId, questionType, questionId);
    this.questionFormat = questionFormat;
    this.questionDescription = questionDescription;
    this.required = required;
    this.characterLimit = characterLimit;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
    this.options = options;
  }
}
