import { EncryptionType } from "../utils/constants";
import { IFormInsight } from "./IFormInsight";
import { IFormSetting } from "./IFormSetting";
import { IQuestion } from "./IQuestion";
import { IResponseDetail } from "./IResponseDetail";

export interface IForm {
  formName: string;
  formSettings: IFormSetting;
  description?: string;
  noOfQuestions: number;
  questions: IQuestion[];
  responses?: IResponseDetail[];
  formType?: string;
  encryption: false;
  encryptionType?: EncryptionType;
  startingDate?: Date | string;
  endingDate?: Date | string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  publish?: boolean;
  slug: string;
  formResponseInsights: IFormInsight;
}
