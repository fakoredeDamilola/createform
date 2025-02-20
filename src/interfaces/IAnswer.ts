import { QuestionType } from "../utils/constants";
import { IOption } from "./IOption";

export interface IAnswer {
  answerId: string;
  questionId: string;
  timeLeft: number;
  selectedOptions?: IOption[];
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
