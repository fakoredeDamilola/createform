import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ContentLayout from "../../Layout/ContentLayout";
import ContentQuestion from "./ContentQuestion";
import {
  Box,
  LinearProgress,
  Stack,
  StackProps,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../../styles/colors";
import {
  moveToNextOrPrevQuestion,
  setFormViewingMode,
  updateAnswerResponse,
  updateAnswersArray,
  updateResponseDetails,
} from "../../store/slices/content.slice";
import { CSSTransition } from "react-transition-group";
import { useMutation } from "@tanstack/react-query";
import { createResponseApi } from "../../api/dashboard.api";
import { checkQuestionRule } from "../../utils/functions";
import theme from "../../styles/theme";
import { IAnswer } from "../../interfaces/IAnswer";
import ChangeQuestionButtons from "../../components/content/ChangeQuestionButtons";
import ErrorBox from "../../components/content/ErrorBox";
import LastContentPage from "../../components/content/LastContentPage";
import ContentTimer from "../../components/content/ContentTimer";
import SubmitButton from "../../components/content/SubmitButton";
import { IQuestionAnswer } from "../../interfaces/IQuestionAnswer";
import AnswerBox from "../../components/content/AnswerBox";
import { ResponseType } from "../../utils/constants";
import { localStorageService } from "../../factory/classes/LocalStorage";

const Content = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { form, numberIndex, answers, timeStarted, response } = useSelector(
    (state: RootState) => state.content
  );

  const [currentIndex, setCurrentIndex] = useState(numberIndex);
  const [correctAnswer, setCorrectAnswer] = useState<IQuestionAnswer | null>(
    null
  );
  const [showAnswerDetails, setShowAnswerDetails] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState({
    showBox: false,
    text: "",
  });

  const { data, status, mutateAsync } = useMutation({
    mutationFn: createResponseApi,
    onSuccess: (data) => {
      // console.log("Item created successfully:", data);
      dispatch(updateResponseDetails({ response: data.data.response }));
    },
    onError: (error) => {
      // console.error("Error creating item:", error);
    },
  });

  const questions = form?.questions;
  const totalQuestions = questions?.length ?? 0;
  const answeredQuestions = answers.filter(
    (answer: IAnswer) => answer.optionId || answer.textResponse
  ).length;
  const notLastQuestion = currentIndex + 1 < (questions?.length ?? 0);
  const progress =
    totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const nodeRef = useRef(null);
  const timeout = 300;

  const updateResponses = async (ans?: IAnswer[]) => {
    const answer = answers[currentIndex];
    await mutateAsync({
      responseId: response._id,
      answers: ans ? ans : [answer],
      formId: form._id,
      formSlug: form.slug,
      timeStarted,
      responseType: ResponseType.UPDATE,
    });
  };

  const slideStyles: Record<string, StackProps["sx"]> = {
    enter: {
      transform: "translateX(100%)",
      opacity: 0,
    },
    enterActive: {
      transform: "translateX(0)",
      opacity: 1,
      transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
    },
    exit: {
      transform: "translateX(0)",
      opacity: 1,
    },
    exitActive: {
      transform: "translateX(-100%)",
      opacity: 0,
      transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
    },
  };

  const validateQuestionWithRule = (direction: number) => {
    const question = questions[currentIndex];
    const answer = answers[currentIndex];
    const rule = checkQuestionRule(question, answer);
    if (rule.showBox === true && direction === 1) {
      setShowErrorBox(rule);
    } else {
      changeQuestion(direction);
    }
  };

  const changeQuestion = (direction: number) => {
    const questionNumber = currentIndex + direction;
    setShowErrorBox({ showBox: false, text: "" });
    updateResponses();
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex(questionNumber);
      setIsExiting(false);
      dispatch(moveToNextOrPrevQuestion(questionNumber));
    }, timeout);
  };

  const onTimeUp = useCallback(() => {
    dispatch(updateAnswerResponse({ disabled: true }));
    changeQuestion(1);
  }, []);

  const submitForm = () => {
    const question = questions[currentIndex];
    const answer = answers[currentIndex];
    const rule = checkQuestionRule(question, answer);

    if (rule.showBox === true) {
      setShowErrorBox(rule);
    } else {
      updateResponses();
      setIsFormSubmitted(true);

      localStorageService.remove("responseData");
    }
  };

  const submitFormBecauseOfTimer = () => {
    updateResponses([]);
    setIsFormSubmitted(true);
    localStorageService.remove("responseData");
  };

  const submitPopQuiz = async () => {
    await updateResponses();
    const correctAnswer = data?.data.correctAnswer;
    if (correctAnswer) {
      updateAnswersArray({ correctAnswer });
      setCorrectAnswer(correctAnswer);
      dispatch(setFormViewingMode(true));
      setShowAnswerDetails(true);
    }
  };

  const moveToNextQuestion = () => {
    setShowAnswerDetails(false);
    dispatch(setFormViewingMode(false));
    setCorrectAnswer(null);
    if (currentIndex + 1 < (questions?.length ?? 0)) {
      const questionNumber = currentIndex + 1;
      setCurrentIndex(questionNumber);
      dispatch(moveToNextOrPrevQuestion(questionNumber));
    } else {
      setIsFormSubmitted(true);
      localStorageService.remove("responseData");
    }
  };

  return (
    <ContentLayout>
      {!isFormSubmitted ? (
        <>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 5,
              backgroundColor: colors.bgOptionTextHover,
              "& .MuiLinearProgress-bar": {
                backgroundColor: colors.bgOptionText,
              },
            }}
          />
          <Stack maxWidth="90%" minWidth="90%" height="100%" margin="0 auto">
            {questions && (
              <CSSTransition
                in={!isExiting}
                timeout={timeout}
                classNames="content"
                unmountOnExit
                nodeRef={nodeRef}
              >
                {(state) => (
                  <>
                    <Stack
                      ref={nodeRef}
                      justifyContent="center"
                      minHeight="80%"
                      sx={{
                        ...slideStyles[state as keyof typeof slideStyles],
                      }}
                    >
                      {form.formSettings.addTimeLimitToForm &&
                        form.totalFormTimeLimit && (
                          <Box position="fixed" bgcolor="red">
                            <ContentTimer
                              duration={form.totalFormTimeLimit}
                              onTimeUp={submitFormBecauseOfTimer}
                            />
                          </Box>
                        )}
                      <Stack
                        boxSizing="border-box"
                        px={isMobile ? "0px" : "80px"}
                        mt="40px"
                        justifyContent="center"
                      >
                        <ContentQuestion
                          question={questions[currentIndex]}
                          answer={answers[currentIndex]}
                          correctAnswer={correctAnswer}
                          setErrorBox={setShowErrorBox}
                          onTimeUp={onTimeUp}
                        >
                          {showErrorBox.showBox ? (
                            <ErrorBox text={showErrorBox.text} />
                          ) : isMobile ? null : (
                            <SubmitButton
                              popQuiz={form?.formSettings?.popQuiz}
                              showAnswerDetails={showAnswerDetails}
                              notLastQuestion={notLastQuestion}
                              validateQuestionWithRule={
                                validateQuestionWithRule
                              }
                              disableCheckButton={
                                answers[currentIndex]?.optionId === ""
                                  ? true
                                  : false
                              }
                              submitPopQuiz={submitPopQuiz}
                              submitForm={submitForm}
                            >
                              <AnswerBox
                                answer={correctAnswer}
                                moveToNextQuestion={moveToNextQuestion}
                                question={questions && questions[currentIndex]}
                              />
                            </SubmitButton>
                          )}
                        </ContentQuestion>
                      </Stack>
                    </Stack>
                  </>
                )}
              </CSSTransition>
            )}
            <ChangeQuestionButtons
              popQuiz={form?.formSettings?.popQuiz}
              currentIndex={currentIndex}
              changeQuestion={validateQuestionWithRule}
              noOfQuestions={questions?.length}
            >
              <SubmitButton
                popQuiz={form?.formSettings?.popQuiz}
                showAnswerDetails={showAnswerDetails}
                notLastQuestion={notLastQuestion}
                disableCheckButton={
                  answers[currentIndex]?.optionId === "" ? true : false
                }
                validateQuestionWithRule={validateQuestionWithRule}
                submitPopQuiz={submitPopQuiz}
                submitForm={submitForm}
              >
                <AnswerBox
                  answer={correctAnswer}
                  moveToNextQuestion={moveToNextQuestion}
                  question={questions && questions[currentIndex]}
                />
              </SubmitButton>
            </ChangeQuestionButtons>
          </Stack>
        </>
      ) : (
        <LastContentPage id={data?.data.response?._id} status={status} />
      )}
    </ContentLayout>
  );
};

export default Content;
