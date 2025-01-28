import { QuestionType } from "../../utils/constants";
import LongText from "./LongText";

export default class ShortText extends LongText {
  constructor(
    formId: string,
    questionType: QuestionType,
    questionId: string,
    questionFormat: "Text" | "Video",
    questionNumber: number
  ) {
    super(formId, questionType, questionId, questionFormat, questionNumber);
    this.characterLimit = true;
  }
}
