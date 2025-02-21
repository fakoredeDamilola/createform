import { IAnswer } from "../../interfaces/IAnswer";
import { Box, Stack, Typography } from "@mui/material";
import { QuestionType } from "../../utils/constants";
import { IQuestion } from "../../interfaces/IQuestion";
import { colors } from "../../styles/colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ResponseUI = ({
  responses,
  question,
}: {
  responses: IAnswer[];
  question: IQuestion;
}) => {
  return (
    <Box my="20px">
      {question.questionType === QuestionType.long_text ||
      question.questionType === QuestionType.short_text ? (
        <Box width="100%">
          {responses.map((response) => (
            <Box
              borderBottom={`1px solid ${colors.buttonBorder}`}
              width="100%"
              py="15px"
            >
              <Typography color={colors.black}>
                {response.textResponse}
              </Typography>
              <Typography fontSize="12px" mt="10px">
                {dayjs(response.dateSubmitted).fromNow()}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : question.questionType === QuestionType.multiple_choice ? (
        <Box>
          {question.options?.map((option, index) => {
            const selectedLength = responses.filter(
              (res) => res.optionId === option.optionId
            ).length;
            const percentageResponse = `${Math.floor(
              (selectedLength / responses.length) * 100
            )}%`;
            return (
              <Box key={index}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt="15px"
                  mb="5px"
                >
                  <Typography color={colors.black} fontSize="14px">
                    {option.optionText}
                  </Typography>
                  <Stack direction="row" gap="30px">
                    <Typography fontSize="14px">
                      {selectedLength} resp.
                    </Typography>
                    <Typography fontSize="14px">
                      {percentageResponse}
                    </Typography>
                  </Stack>
                </Stack>
                <Box
                  mb="5px"
                  height="25px"
                  width="100%"
                  borderRadius="4px"
                  bgcolor={colors.multipleSelectBox}
                >
                  <Box
                    width={percentageResponse}
                    height="100%"
                    bgcolor={colors.pastelLavender}
                    borderRadius={
                      percentageResponse === "100%" ? "4px" : "4px 0 0 4px"
                    }
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
};

export default ResponseUI;
