import { QuestionType } from "../utils/constants";

export interface IAnswer {
  answerId: string;
  questionId: string;
  timeLeft: number;
  optionIds?: string[];
  optionId?: string;
  booleanQuestion?: boolean;
  textResponse?: string;
  questionType: QuestionType;
  questionNumber: number;
  disabledResponse: boolean;
  answeredQuestion?: boolean;
  createdAt?: string;
  dateSubmitted?: string;
  correctResponse?: boolean;

  scoreForQuestion?: number;
}
