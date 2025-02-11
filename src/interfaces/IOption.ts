import { BooleanLabel, OptionLabel } from "../utils/constants";

export interface IOption {
  optionId: string;
  optionText: string;
  optionLabel?: OptionLabel | BooleanLabel | number;
  selectedOption: boolean;
  correctOption?: boolean;
  optionPosition?: number;
}
