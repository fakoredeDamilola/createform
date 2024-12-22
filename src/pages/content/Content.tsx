import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ContentLayout from "../../Layout/ContentLayout";
import ContentQuestion from "./ContentQuestion";
import {
  Button,
  LinearProgress,
  Stack,
  StackProps,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../../styles/colors";
import { moveToNextOrPrevQuestion } from "../../store/slices/content.slice";
import { CSSTransition } from "react-transition-group";
import { useMutation } from "@tanstack/react-query";
import { createResponseApi } from "../../api/dashboard.api";
import { checkQuestionRule } from "../../utils/functions";
import theme from "../../styles/theme";
import { IAnswer } from "../../interfaces/IAnswer";
import ChangeQuestionButtons from "../../components/content/ChangeQuestionButtons";

const Content = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { form, numberIndex, answers, timeStarted } = useSelector(
    (state: RootState) => state.content
  );

  const [currentIndex, setCurrentIndex] = useState(numberIndex);
  const [isExiting, setIsExiting] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState({
    showBox: false,
    text: "",
  });

  const { mutate } = useMutation({
    mutationFn: createResponseApi,
    onSuccess: (data) => {
      console.log("Item created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating item:", error);
    },
  });

  const questions = form?.questions;
  const totalQuestions = form?.noOfQuestions ?? 0;
  const answeredQuestions = answers.filter(
    (answer: IAnswer) => answer.optionId || answer.textResponse
  ).length;
  const notLastQuestion = currentIndex + 1 < (form.noOfQuestions ?? 0);
  const progress =
    totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
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

  const changeQuestion = (direction: number) => {
    const question = questions[currentIndex];
    const answer = answers[currentIndex];
    const rule = checkQuestionRule(question, answer);
    if (rule.showBox === true && direction === 1) {
      setShowErrorBox(rule);
    } else {
      const questionNumber = currentIndex + direction;
      setShowErrorBox({ showBox: false, text: "" });
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex(questionNumber);
        setIsExiting(false);
        dispatch(moveToNextOrPrevQuestion(questionNumber));
      }, timeout);
    }
  };

  const submitQuestion = () => {
    const question = questions[currentIndex];
    const answer = answers[currentIndex];
    const rule = checkQuestionRule(question, answer);

    if (rule.showBox === true) {
      setShowErrorBox(rule);
    } else {
      mutate({ answers, formId: form._id, timeStarted });
    }
  };

  return (
    <ContentLayout>
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
                  <Stack
                    boxSizing="border-box"
                    px={isMobile ? "0px" : "80px"}
                    mt="40px"
                    justifyContent="center"
                  >
                    <ContentQuestion
                      question={questions[currentIndex]}
                      answer={answers[currentIndex]}
                      noOfQuestions={form.noOfQuestions}
                      currentIndex={currentIndex}
                      changeQuestion={changeQuestion}
                      submitQuestion={submitQuestion}
                      errorBox={showErrorBox}
                      setErrorBox={setShowErrorBox}
                    />
                  </Stack>
                </Stack>
              </>
            )}
          </CSSTransition>
        )}
        <ChangeQuestionButtons
          currentIndex={currentIndex}
          changeQuestion={changeQuestion}
          noOfQuestions={form.noOfQuestions}
        >
          <Button
            fullWidth
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
        </ChangeQuestionButtons>
      </Stack>
    </ContentLayout>
  );
};

export default Content;
