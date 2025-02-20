import { Box, Typography } from "@mui/material";

import { IOption } from "../../interfaces/IOption";
import { useDispatch } from "react-redux";
import {
  addNewOptionToMultipleChoice,
  createOrUpdateQuestionAnswer,
  removeQuestionOption,
  updateOptionInMultipleChoice,
} from "../../store/slices/form.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QuestionOption from "./QuestionOption";
import { FormItemType, QuestionType } from "../../utils/constants";
import { colors } from "../../styles/colors";
import { GrCheckmark } from "react-icons/gr";
import { useEffect, useState } from "react";

const CreateQuestionOptions = ({
  questionType,
  _id,
}: {
  _id: string;
  questionType: QuestionType;
}) => {
  const dispatch = useDispatch();

  const [selectedOptionId, setSelectedOptionId] = useState<string[]>([]);

  const { form, selectedQuestion } = useSelector(
    (state: RootState) => state.form
  );

  const options = form?.questions.find(
    (question) => question._id === _id
  )?.options;

  const createNewOption = () => {
    dispatch(addNewOptionToMultipleChoice({ questionId: _id }));
  };

  const updateSelectedOptionValue = (
    value: string,
    optionId: string,
    select?: boolean
  ) => {
    if (value.length % 3 === 0 || value === "NO") {
      dispatch(
        updateOptionInMultipleChoice({
          questionId: _id,
          value,
          optionId,
          select: select ?? false,
        })
      );
    }
  };

  const removeOptionFromQuestion = (optionId: string) => {
    dispatch(removeQuestionOption({ optionId, questionId: _id }));
  };

  const selectOptionAsAnswer = (optionId: string) => {
    dispatch(
      createOrUpdateQuestionAnswer({
        questionAnswer: optionId,
        questionId: _id,
        questionType,
        formId: form._id,
      })
    );
    selectNewOption();
  };

  const selectNewOption = () => {
    if (
      selectedQuestion.formItemType === FormItemType.QUESTION &&
      "correctAnswer" in selectedQuestion
    ) {
      if (selectedQuestion.correctAnswer?.answerResults) {
        setSelectedOptionId(selectedQuestion.correctAnswer?.answerResults);
      } else {
        setSelectedOptionId([]);
      }
    }
  };

  useEffect(() => {
    selectNewOption();
  }, [selectedQuestion]);

  return (
    <Box>
      {options?.map((option: IOption) => {
        const selectedOption = selectedOptionId?.includes(option.optionId);

        return (
          <QuestionOption
            key={option.optionId}
            bgColor={
              option.selectedOption
                ? colors.selectedOptionBackground
                : colors.bgOption
            }
            boxShadow={
              option.selectedOption
                ? colors.selectedOptionBoxShadow
                : colors.optionBoxShadow
            }
            option={option}
            formViewingMode={false}
            updateSelectedOptionValue={updateSelectedOptionValue}
            removeOptionFromQuestion={removeOptionFromQuestion}
            noCancelButton={
              options.length === 1 || questionType === QuestionType.boolean
                ? true
                : false
            }
          >
            <Box
              width="20px"
              height="20px"
              position="absolute"
              bgcolor={colors.secondaryColor}
              border={`1px solid ${colors.bgOption}`}
              color="white"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              fontSize="23px"
              right="-30px"
              top="25%"
              fontWeight="bold"
              display={form.formSettings.addAnswerToQuestion ? "flex" : "none"}
              sx={{ cursor: "pointer" }}
              onClick={() => selectOptionAsAnswer(option.optionId)}
            >
              <GrCheckmark
                fontSize="14px"
                style={{
                  color: selectedOption ? "blue" : colors.secondaryColor,
                }}
              />
            </Box>
          </QuestionOption>
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
