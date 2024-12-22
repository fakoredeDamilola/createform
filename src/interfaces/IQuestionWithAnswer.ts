import { IAnswer } from "./IAnswer";
import { IQuestion } from "./IQuestion";

export interface IQuestionWithAnswer {
  question: IQuestion;
  answers: IAnswer[];
}
