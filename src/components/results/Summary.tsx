import { Box, Button, Stack, Typography } from "@mui/material";
import { IQuestionWithAnswer } from "../../interfaces/IQuestionWithAnswer";
import { colors } from "../../styles/colors";
import Icon from "../Icon";
import { getTotalResponses } from "../../utils/functions";
import ResponseUI from "./ResponseUI";

const Summary = ({
  questionsWithAnswers,
}: {
  questionsWithAnswers: IQuestionWithAnswer[];
}) => {
  return (
    <Box>
      <Typography>Response Summary</Typography>
      <Stack direction="row" gap="40px">
        <Box my="20px" width="70%">
          {questionsWithAnswers?.map((content) => {
            const { question, answers } = content;
            const totalResponse = getTotalResponses(answers);

            return (
              <Stack
                key={question._id}
                my="20px"
                bgcolor={colors.white}
                borderRadius="4px"
                py="15px"
                px="20px"
                direction="row"
                gap="20px"
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  height="100%"
                  bgcolor={colors.questionTabNumber}
                  color={colors.borderTwoText}
                  borderRadius="6px"
                  padding="2px 6px"
                  width="60px"
                >
                  <Icon
                    fontSize="24px"
                    iconName={question.questionType}
                    withBg={false}
                  />
                  <Typography fontSize="18px">
                    {question.questionNumber}
                  </Typography>
                </Stack>
                <Box width="70%">
                  <Typography color={colors.black}>
                    {question.questionText[0]}
                  </Typography>
                  <Typography fontSize="12px" mt="10px">
                    {totalResponse.length} out of {answers.length} people
                    answered this question
                  </Typography>
                  <Box width="100%">
                    <ResponseUI responses={totalResponse} question={question} />
                  </Box>
                </Box>
              </Stack>
            );
          })}
        </Box>
        <Box>
          <Button variant="contained">Generate a Report</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Summary;
