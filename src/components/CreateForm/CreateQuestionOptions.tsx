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
import { QuestionType } from "../../utils/constants";
import { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import { GrCheckmark } from "react-icons/gr";
import { IQuestion } from "../../interfaces/IQuestion";

const CreateQuestionOptions = ({
  _id,
  questionType,
}: {
  _id: string;

  questionType: QuestionType;
}) => {
  const dispatch = useDispatch();

  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>();

  const { form } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    const findQuestionAnswer = form.questions.find(
      (question) => question._id === _id
    );
    if (findQuestionAnswer) {
      setSelectedQuestion(findQuestionAnswer);
    }
  }, [form, _id]);

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
  };

  return (
    <Box>
      {options?.map((option: IOption) => {
        const selectedOption =
          selectedQuestion?.correctAnswer?.answerResults?.includes(
            option.optionId
          );

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
