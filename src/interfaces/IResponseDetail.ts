import { EncryptionType } from "../utils/constants";
import { IAnswer } from "./IAnswer";

export interface IResponseDetail {
  _id: string;
  email?: string;
  name?: string;
  noOfQuestionsAnswered: number;
  encryptionType: EncryptionType;
  encryptionDetails: { [key: string]: string };
  totalTimeTaken: string;
  submissionDate: string;
  formId: string;
  answers: IAnswer[];
  createdAt: string;
  updatedAt: string;
}
