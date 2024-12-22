import { QuestionType } from "../utils/constants";
import { IOption } from "./IOption";

export interface IQuestion {
  _id?: string;
  questionId: string;
  questionNumber: number;
  questionFormat: "Text" | "Video";
  required: boolean;
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
}
