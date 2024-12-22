import { QuestionType } from "../../utils/constants";

export class QuestionSkeleton {
  formId: string;
  questionId: string;
  questionType: QuestionType;
  constructor(formId: string, questionType: QuestionType, questionId: string) {
    this.formId = formId;
    this.questionType = questionType;
    this.questionId = questionId;
  }
}
