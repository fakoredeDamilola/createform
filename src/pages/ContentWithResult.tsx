import { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import ContentQuestion from "./content/ContentQuestion";
import { Stack, StackProps, Typography, useMediaQuery } from "@mui/material";

import {
  getResponseDetails,
  moveToNextOrPrevQuestion,
  updateAnswerResponse,
} from "../store/slices/content.slice";
import { CSSTransition } from "react-transition-group";
import { useQuery } from "@tanstack/react-query";
import theme from "../styles/theme";
import ChangeQuestionButtons from "../components/content/ChangeQuestionButtons";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getFormAndResponseById } from "../api/dashboard.api";
import { colors } from "../styles/colors";
import { formatDate } from "../utils/functions";
import { QuestionType } from "../utils/constants";
import AnswerBox from "../components/content/AnswerBox";

const ContentWithResult = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { form, numberIndex, response } = useSelector(
    (state: RootState) => state.content
  );
  console.log({ response });

  const [currentIndex, setCurrentIndex] = useState(numberIndex);
  const [isExiting, setIsExiting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getResponseById", params.responseId],
    queryFn: ({ queryKey }) => getFormAndResponseById(queryKey[1] as string),
    enabled: !!params.responseId,
  });

  useEffect(() => {
    if (data) {
      dispatch(
        getResponseDetails({ form: data?.form, response: data?.response })
      );
    }
  }, [data, dispatch]);

  const questions = form?.questions;

  const nodeRef = useRef(null);
  const timeout = 300;
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
    changeQuestion(direction);
  };

  const changeQuestion = (direction: number) => {
    const questionNumber = currentIndex + direction;
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

  if (isLoading) <Spinner />;
  return (
    <Stack width="100%" height="100vh" position="relative">
      <Stack maxWidth="90%" minWidth="90%" height="100%" margin="0 auto">
        <Typography
          fontSize="22px"
          // mt="40px"
          textAlign="center"
          color={colors.mistBlue}
        >
          Here is the form you submitted at {formatDate(response?.updatedAt)}
        </Typography>
        {questions && response?.answers && (
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
                  <Stack
                    boxSizing="border-box"
                    px={isMobile ? "0px" : "80px"}
                    mt="40px"
                    justifyContent="center"
                  >
                    <ContentQuestion
                      question={questions[currentIndex]}
                      answer={response.answers[currentIndex]}
                      correctAnswer={questions[currentIndex]?.correctAnswer}
                      setErrorBox={null}
                      onTimeUp={onTimeUp}
                    >
                      {(questions[currentIndex].questionType ===
                        QuestionType.long_text ||
                        questions[currentIndex].questionType ===
                          QuestionType.short_text) && (
                        <AnswerBox
                          answer={questions[currentIndex]?.correctAnswer}
                          moveToNextQuestion={() => {}}
                          question={questions && questions[currentIndex]}
                          dontShowNextButton={true}
                        />
                      )}
                    </ContentQuestion>
                  </Stack>
                </Stack>
              </>
            )}
          </CSSTransition>
        )}
        <ChangeQuestionButtons
          popQuiz={false}
          currentIndex={currentIndex}
          changeQuestion={validateQuestionWithRule}
          noOfQuestions={questions?.length}
        >
          <></>
        </ChangeQuestionButtons>
      </Stack>
    </Stack>
  );
};

export default ContentWithResult;
