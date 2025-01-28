import { FormItemType, QuestionType } from "../utils/constants";
import { IOption } from "./IOption";
import { IQuestionAnswer } from "./IQuestionAnswer";

export interface IQuestion {
  _id?: string;
  questionId: string;
  questionNumber: number;
  questionFormat: "Text" | "Video";
  required: boolean;
  timeLimit: boolean;
  disabled: boolean;
  totalTime: number;
  characterLimit: boolean;
  maxCharacters?: string;
  multipleSelection?: boolean;
  randomize?: boolean;
  questionDescription: string;
  formId: string;
  questionText: string;
  description?: string;
  questionType: QuestionType;
  options?: IOption[];
  correctAnswer: IQuestionAnswer;
  formItemType: FormItemType;
}
