import { FormItemType, FormStaticType } from "../utils/constants";

export interface IStaticPage {
  questionId: string;
  pageTitle: string;
  pageDescription: string;
  instructions: string;
  formItemType: FormItemType;
  formStaticType: FormStaticType;
  autoInstructions?: string[];
}
