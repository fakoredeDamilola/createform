import { Box, Stack } from "@mui/material";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { IQuestion } from "../../interfaces/IQuestion";
import QuestionListItem from "./QuestionListItem";

interface IProps {
  questions: IQuestion[];
  formId: string;
}

const LeftSideBar = ({ questions, formId }: IProps) => {
  const [topHeight, setTopHeight] = useState(60);
  const [isResizing, setIsResizing] = useState(false);

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
            <QuestionListItem formId={formId} question={question} />
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
        }}
      >
        <p>Bottom Content</p>
      </div>
    </Box>
  );
};

export default LeftSideBar;
