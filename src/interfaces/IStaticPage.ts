import { FormItemType, FormStaticType } from "../utils/constants";

export interface IStaticPage {
  questionId: string;
  pageTitle: string;
  pageDescription: string;
  formItemType: FormItemType;
  formStaticType: FormStaticType;
  instructions?: string[];
  showPage: boolean;
}
