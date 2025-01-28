// /Users/fakorededamilola/projects/createform/src/factory/classes/Boolean.ts

import { IOption } from "../../interfaces/IOption";
import { BooleanLabel, QuestionType } from "../../utils/constants";
import { createNewOptionSkeleton } from "../../utils/functions";
import MultipleChoice from "./MultipleChoice";

export class BooleanChoice extends MultipleChoice {
  constructor(
    formId: string,
    questionType: QuestionType,
    questionId: string,
    questionFormat: "Text" | "Video",
    questionNumber: number,
    options: IOption[]
  ) {
    super(
      formId,
      questionType,
      questionId,
      questionFormat,
      questionNumber,
      options
    );
    this.options = [
      createNewOptionSkeleton(BooleanLabel.YES),
      createNewOptionSkeleton(BooleanLabel.NO),
    ];
  }
}
