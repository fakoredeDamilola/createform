import { Box, Stack } from "@mui/material";
import { colors } from "../../styles/colors";
import { useState } from "react";
import QuestionListItem from "./QuestionListItem";
import StaticPageItem from "./custom/StaticPageItem";
import { IForm } from "../../interfaces/IForm";
import { renumberQuestions } from "../../utils/functions";
import { setQuestions } from "../../store/slices/form.slice";
import { useDispatch } from "react-redux";
import { deleteQuestionApi } from "../../api/dashboard.api";
import { IQuestion } from "../../interfaces/IQuestion";

interface IProps {
  form: IForm;
  formId: string;
}

const LeftSideBar = ({ form, formId }: IProps) => {
  const [topHeight, setTopHeight] = useState(60);
  const [isResizing, setIsResizing] = useState(false);
  const questions = form.questions;
  const dispatch = useDispatch();

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing) {
      const newTopHeight = (e.clientY / window.innerHeight) * 100;
      setTopHeight(newTopHeight);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const deleteQuestionFunc = async (questionId: string) => {
    const questions = [...form.questions];
    const questionIndex = questions.findIndex(
      (question) => question._id === questionId
    );
    if (questionIndex !== -1) {
      questions.splice(questionIndex, 1);
      const newQuestions: IQuestion[] = renumberQuestions(questions);

      await deleteQuestionApi(questionId, formId);
      dispatch(setQuestions({ questions: newQuestions }));
    }
  };

  return (
    <Box
      minWidth="250px"
      position="relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      sx={{ userSelect: "none" }}
    >
      <div
        style={{
          height: `${topHeight}%`,
          backgroundColor: colors.secondaryColor,
          borderRadius: "12px",
          padding: "10px 0",
          overflowY: "scroll",
        }}
      >
        {questions?.map((question) => (
          <Box margin="10px 0" key={question.questionId}>
            <QuestionListItem
              formId={formId}
              question={question}
              deleteQuestionFunc={deleteQuestionFunc}
            />
          </Box>
        ))}
      </div>

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box
          sx={{
            height: "4px",

            width: "40px",
            borderRadius: "12px",
            backgroundColor: colors.borderTwo,
            cursor: "ns-resize",
            my: "4px",
          }}
          onMouseDown={handleMouseDown}
        ></Box>
      </Stack>

      {/* Bottom Div */}
      <div
        style={{
          height: `${100 - topHeight - 2}%`,
          backgroundColor: colors.secondaryColor,
          borderRadius: "12px",
          padding: "15px 0",
          overflowY: "scroll",
        }}
      >
        {form.formStartPage && (
          <Box p="10px 0">
            <StaticPageItem staticPage={form?.formStartPage} />
          </Box>
        )}
        {form.formEndPage && (
          <Box p="10px 0">
            <StaticPageItem staticPage={form?.formEndPage} />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default LeftSideBar;
