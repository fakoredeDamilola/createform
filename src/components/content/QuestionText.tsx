import { Typography, useMediaQuery } from "@mui/material";

import { IQuestion } from "../../interfaces/IQuestion";
import theme from "../../styles/theme";
import { QuestionType } from "../../utils/constants";
import { colors } from "../../styles/colors";

const QuestionText = ({ question }: { question: IQuestion }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log({ question });
  return (
    <Typography fontSize={isMobile ? "20px" : "24px"}>
      {question.questionType === QuestionType.fill_the_gap ? (
        <div>
          {question.questionText.map((item, index) =>
            item === "" ? (
              <div
                key={index}
                style={{
                  display: "inline-block",
                  width: "80px",
                  borderBottom: `2px solid ${colors.primaryColor}`,
                  margin: "0 5px",
                }}
              ></div>
            ) : (
              <span key={index}>{item}</span>
            )
          )}
        </div>
      ) : (
        question.questionText[0]
      )}
      {question.required && "*"}
    </Typography>
  );
};

export default QuestionText;
