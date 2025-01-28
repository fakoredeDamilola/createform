import { QuestionType } from "../utils/constants";

export interface IQuestionAnswer {
  description?: string;
  questionAnswerId: string;
  formId: string;
  questionId: string;
  questionType: QuestionType;
  answerResults: string[];
}
