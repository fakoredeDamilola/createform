import { IQuestion } from "../../interfaces/IQuestion";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
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
import { checkResponseLength } from "../../utils/functions";
import { useMutation } from "@tanstack/react-query";
import { updateFormInsightApi } from "../../api/dashboard.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import theme from "../../styles/theme";
import ContentTimer from "../../components/content/ContentTimer";
import { IQuestionAnswer } from "../../interfaces/IQuestionAnswer";

const ContentQuestion = ({
  question,
  answer,
  correctAnswer,
  children,
  setErrorBox,
  onTimeUp,
}: {
  question: IQuestion;
  answer: IAnswer;
  correctAnswer: IQuestionAnswer | null;
  onTimeUp: () => void;
  setErrorBox: React.Dispatch<
    React.SetStateAction<{ showBox: boolean; text: string }>
  > | null;
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [debouncedResponseText, setDebouncedResponseText] = useState("");
  const debouncedResponse = useDebounce(debouncedResponseText, 500);
  const { form, formViewingMode } = useSelector(
    (state: RootState) => state.content
  );

  const { mutate } = useMutation({
    mutationFn: updateFormInsightApi,
  });

  useEffect(() => {
    setDebouncedResponseText(answer?.textResponse || "");
  }, [answer]);

  useEffect(() => {
    if (debouncedResponse !== "" && setErrorBox) {
      setErrorBox({ showBox: false, text: "" });
      if (checkResponseLength(debouncedResponse, question.maxCharacters)) {
        setErrorBox({ showBox: true, text: "Text Limit Exceeded" });
      } else {
        setErrorBox({ showBox: false, text: "" });
        dispatch(updateAnswerResponse({ textResponse: debouncedResponse }));
        updateFormInsight();
      }
    }
  }, [debouncedResponse, dispatch]);

  const updateSelectedOptionValue = (value: string, optionId: string) => {
    dispatch(selectAnswerOption({ optionId }));
    updateFormInsight();
  };

  const updateFormInsight = () => {
    if (form._id) {
      mutate({ formID: form._id, formInsight: { starts: 1 } });
      dispatch(setStartResponding());
    }
  };

  return (
    <Box>
      <Stack direction="row" gap={isMobile ? "5px" : "20px"}>
        {!formViewingMode && question.timeLimit && (
          <ContentTimer
            duration={answer.timeLeft}
            onTimeUp={onTimeUp}
            answerId={answer.answerId}
          />
        )}
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
                disableInput={
                  answer.disabledResponse || !formViewingMode ? false : true
                }
                setValue={setDebouncedResponseText}
                borderB={true}
              />
            </Box>
          )}
          {(question.questionType === QuestionType.multiple_choice ||
            question.questionType === QuestionType.boolean) && (
            <Box mt="40px">
              {question.options?.map((option: IOption) => {
                const selectedOption =
                  answer.optionId === option.optionId ? true : false;
                const correctOption =
                  formViewingMode &&
                  correctAnswer?.answerResults.includes(option.optionId)
                    ? true
                    : false;

                console.log({
                  selectedOption,
                  correctOption,
                  answer,
                });
                return (
                  <Box mt="20px" key={option.optionId}>
                    <QuestionOption
                      option={{
                        ...option,
                        selectedOption,
                        correctOption,
                      }}
                      bgColor={
                        correctOption
                          ? colors.selectedCorrectOptionBackground
                          : selectedOption
                          ? formViewingMode
                            ? colors.selectedWrongOptionBackground
                            : colors.selectedOptionBackground
                          : ""
                      }
                      boxShadow={
                        correctOption
                          ? colors.selectedCorrectOptionBoxShadow
                          : selectedOption
                          ? formViewingMode
                            ? colors.selectedWrongOptionBoxShadow
                            : colors.selectedOptionBoxShadow
                          : ""
                      }
                      contentDisplay={true}
                      formViewingMode={formViewingMode}
                      updateSelectedOptionValue={updateSelectedOptionValue}
                      removeOptionFromQuestion={() => {}}
                      noCancelButton={true}
                    />
                  </Box>
                );
              })}
            </Box>
          )}
          <Box mt="20px">{children}</Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContentQuestion;
