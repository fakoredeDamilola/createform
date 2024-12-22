import { QuestionType } from "../utils/constants";

export interface IAnswer {
  questionId: string;
  optionIds?: string[];
  optionId?: string;
  booleanQuestion?: boolean;
  textResponse?: string;
  questionType: QuestionType;
  questionNumber: number;
  answeredQuestion?: boolean;
  createdAt?: string;
  dateSubmitted?: string;
}
