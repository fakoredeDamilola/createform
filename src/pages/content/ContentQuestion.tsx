import { IQuestion } from "../../interfaces/IQuestion";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";
import { colors } from "../../styles/colors";
import { IOption } from "../../interfaces/IOption";
import QuestionOption from "../../components/CreateForm/QuestionOption";
import { QuestionType } from "../../utils/constants";
import AutoGrowingTextArea from "../../components/AutoGrowingTextArea";
import { useEffect, useState } from "react";
import { IAnswer } from "../../interfaces/IAnswer";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  selectAnswerOption,
  setStartResponding,
  updateAnswerResponse,
} from "../../store/slices/content.slice";
import ErrorBox from "../../components/content/ErrorBox";
import { checkResponseLength } from "../../utils/functions";
import { useMutation } from "@tanstack/react-query";
import { updateFormInsightApi } from "../../api/dashboard.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import theme from "../../styles/theme";

const ContentQuestion = ({
  question,
  answer,
  noOfQuestions,
  currentIndex,
  changeQuestion,
  submitQuestion,
  errorBox,
  setErrorBox,
}: {
  question: IQuestion;
  answer: IAnswer;
  noOfQuestions: number;
  currentIndex: number;
  changeQuestion: (direction: number) => void;
  submitQuestion: () => void;
  errorBox: { showBox: boolean; text: string };
  setErrorBox: React.Dispatch<
    React.SetStateAction<{ showBox: boolean; text: string }>
  >;
}) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [debouncedResponseText, setDebouncedResponseText] = useState("");
  const debouncedResponse = useDebounce(debouncedResponseText, 500);
  const notLastQuestion = currentIndex + 1 < (noOfQuestions ?? 0);
  const { startResponding, form } = useSelector(
    (state: RootState) => state.content
  );

  const { mutate } = useMutation({
    mutationFn: updateFormInsightApi,
  });

  useEffect(() => {
    setDebouncedResponseText(answer?.textResponse || "");
  }, [answer]);

  useEffect(() => {
    if (debouncedResponse !== "") {
      setErrorBox({ showBox: false, text: "" });
      if (checkResponseLength(debouncedResponse, question.maxCharacters)) {
        setErrorBox({ showBox: true, text: "Text Limit Exceeded" });
      } else {
        setErrorBox({ showBox: false, text: "" });
        dispatch(updateAnswerResponse({ responseText: debouncedResponse }));
        updateFormInsight();
      }
    }
  }, [debouncedResponse, dispatch]);

  const updateOptionsValue = (
    value: string,
    optionId: string,
    select?: boolean
  ) => {
    dispatch(selectAnswerOption({ optionId }));
    updateFormInsight();
  };

  const updateFormInsight = () => {
    console.log("here", { startResponding, question });
    if (form._id) {
      mutate({ formID: form._id, formInsight: { starts: 1 } });
      dispatch(setStartResponding());
    }
  };

  return (
    <Box>
      <Stack direction="row" gap={isMobile ? "5px" : "20px"}>
        <Stack
          height={isMobile ? "20px" : "40px"}
          width={isMobile ? "20px" : "40px"}
          borderRadius="4px"
          bgcolor={colors.white}
          sx={{
            boxShadow: colors.selectedOptionBoxShadow,
          }}
          mt={isMobile ? "4px" : "0px"}
          fontSize={isMobile ? "10px" : "14px"}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {question.questionNumber}
        </Stack>
        <FaArrowRightLong
          style={{ fontSize: isMobile ? "14px" : "20px", marginTop: "10px" }}
        />
        <Box width="100%">
          <Typography fontSize={isMobile ? "20px" : "24px"}>
            {question.questionText}
            {question.required && "*"}
          </Typography>
          {(question.questionType === QuestionType.short_text ||
            question.questionType === QuestionType.long_text) && (
            <Box width="100%" mt="40px">
              <AutoGrowingTextArea
                fontSize="22px"
                characterLimit={question.maxCharacters}
                placeholder="Type Your Answer here..."
                value={debouncedResponseText}
                setValue={setDebouncedResponseText}
                borderB={true}
              />
            </Box>
          )}
          {question.questionType === QuestionType.multiple_choice && (
            <Box mt="40px">
              {question.options?.map((option: IOption) => {
                return (
                  <Box mt="20px" key={option.optionId}>
                    <QuestionOption
                      option={{
                        ...option,
                        selectedOption:
                          answer.optionId === option.optionId ? true : false,
                      }}
                      contentDisplay={true}
                      updateOptionsValue={updateOptionsValue}
                      removeOptionFromQuestion={() => {}}
                      noCancelButton={true}
                    />
                  </Box>
                );
              })}
            </Box>
          )}
          <Box mt="20px">
            {errorBox.showBox ? (
              <ErrorBox text={errorBox.text} />
            ) : isMobile ? null : (
              <Button
                variant="contained"
                onClick={() =>
                  notLastQuestion ? changeQuestion(1) : submitQuestion()
                }
                sx={{
                  bgcolor: colors.bgOptionText,
                  color: colors.white,
                  fontSize: "20px",
                }}
              >
                {notLastQuestion ? "OK" : "Submit"}
              </Button>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContentQuestion;
