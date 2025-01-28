import { IQuestionAnswer } from "../../interfaces/IQuestionAnswer";
import { FormItemType, QuestionType } from "../../utils/constants";

export class QuestionSkeleton {
  formId: string;
  questionId: string;
  questionType: QuestionType;
  questionDescription: string;
  required: boolean;
  characterLimit: boolean;
  timeLimit: boolean;
  totalTime: number;
  questionText: string;
  disabled: boolean;
  correctAnswer: IQuestionAnswer;
  formItemType: FormItemType;

  constructor(formId: string, questionType: QuestionType, questionId: string) {
    this.formId = formId;
    this.questionType = questionType;
    this.questionId = questionId;
    this.questionDescription = "";
    this.required = false;
    this.characterLimit = false;
    this.timeLimit = false;
    this.totalTime = 0;
    this.questionText = "";
    this.questionDescription = "";
    this.disabled = false;
    this.correctAnswer = {} as IQuestionAnswer;
    this.formItemType = FormItemType.QUESTION;
  }
}
