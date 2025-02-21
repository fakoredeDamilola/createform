import { IQuestionAnswer } from "../../interfaces/IQuestionAnswer";
import { Box, Button, Stack, Typography } from "@mui/material";
import { colors } from "../../styles/colors";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionType } from "../../utils/constants";

const AnswerBox = ({
  answer,
  moveToNextQuestion,
  question,
  dontShowNextButton,
}: {
  answer: IQuestionAnswer | null;
  moveToNextQuestion: () => void;
  question: IQuestion;
  dontShowNextButton?: boolean;
}) => {
  return (
    <Box
      sx={{
        bgcolor: colors.bgOptionText,
        color: colors.white,
        fontSize: "20px",
        borderRadius: "12px",
        width: "100%",
        padding: "10px 15px",
      }}
    >
      <Box mb="20px">
        <Stack flexDirection="row">
          <Typography color={colors.secondaryColor} mt="2px">
            The correct answer is{" "}
          </Typography>{" "}
          {question.questionType === QuestionType.multiple_choice ? (
            answer?.answerResults.map((result) => {
              const textAnswer = question.options?.find(
                (opt) => opt.optionId === result
              );
              return (
                <Typography
                  fontSize="18px"
                  marginLeft="5px"
                  color={colors.white}
                >
                  {textAnswer?.optionText}
                </Typography>
              );
            })
          ) : question.questionType === QuestionType.short_text ||
            question.questionType === QuestionType.long_text ? (
            <Typography fontSize="18px" marginLeft="5px" color={colors.white}>
              {answer?.answerResults[0]}
            </Typography>
          ) : null}
        </Stack>
      </Box>
      {!dontShowNextButton && (
        <Button
          fullWidth
          variant="contained"
          onClick={moveToNextQuestion}
          sx={{
            my: "15px",
            bgcolor: colors.white,
            color: colors.bgOptionText,
            fontSize: "20px",
          }}
        >
          OK
        </Button>
      )}
    </Box>
  );
};

export default AnswerBox;
