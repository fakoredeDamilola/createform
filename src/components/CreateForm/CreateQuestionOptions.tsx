import { Box, Typography } from "@mui/material";

import { IOption } from "../../interfaces/IOption";
import { useDispatch } from "react-redux";
import {
  addNewOptionToMultipleChoice,
  removeQuestionOption,
  updateOptionInMultipleChoice,
} from "../../store/slices/form.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QuestionOption from "./QuestionOption";
import { QuestionType } from "../../utils/constants";

const CreateQuestionOptions = ({
  questionId,
  questionType,
}: {
  questionId: string;

  questionType: QuestionType;
}) => {
  const dispatch = useDispatch();

  const { form } = useSelector((state: RootState) => state.form);

  const options = form?.questions.find(
    (question) => question.questionId === questionId
  )?.options;

  const createNewOption = () => {
    dispatch(addNewOptionToMultipleChoice({ questionId }));
  };

  const updateOptionsValue = (
    value: string,
    optionId: string,
    select?: boolean
  ) => {
    if (value.length % 3 === 0 || value === "NO") {
      dispatch(
        updateOptionInMultipleChoice({
          questionId,
          value,
          optionId,
          select: select ?? false,
        })
      );
    }
  };

  const removeOptionFromQuestion = (optionId: string) => {
    dispatch(removeQuestionOption({ optionId, questionId }));
  };

  return (
    <Box>
      {options?.map((option: IOption) => {
        return (
          <QuestionOption
            key={option.optionId}
            option={option}
            updateOptionsValue={updateOptionsValue}
            removeOptionFromQuestion={removeOptionFromQuestion}
            noCancelButton={
              options.length === 1 || questionType === QuestionType.boolean
                ? true
                : false
            }
          />
        );
      })}
      <Typography
        display={
          options?.length === 5 || questionType === QuestionType.boolean
            ? "none"
            : "block"
        }
        sx={{ cursor: "pointer", fontSize: "14px" }}
        onClick={createNewOption}
      >
        Add Choice
      </Typography>
    </Box>
  );
};

export default CreateQuestionOptions;
