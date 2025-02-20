import { Typography, useMediaQuery } from "@mui/material";

import { IQuestion } from "../../interfaces/IQuestion";
import theme from "../../styles/theme";
import { QuestionType } from "../../utils/constants";
import { colors } from "../../styles/colors";
import { IAnswer } from "../../interfaces/IAnswer";
import { IOption } from "../../interfaces/IOption";

const QuestionText = ({
  question,
  answer,
  returnAnswerBackToOption,
  answerResults,
  formViewingMode,
}: {
  question: IQuestion;
  answer: IAnswer;
  returnAnswerBackToOption: (option: IOption) => void;
  answerResults?: string[] | null;
  formViewingMode?: boolean;
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Typography fontSize={isMobile ? "20px" : "24px"}>
      {question.questionType === QuestionType.fill_the_gap ? (
        <div>
          {(() => {
            let answerIndex = 0;

            return question.questionText.map((item, index) => {
              if (item === "") {
                const optionText =
                  answer?.selectedOptions?.[answerIndex]?.optionText;

                const correctAnswerText =
                  answerResults &&
                  question.options?.find(
                    (opt) => opt.optionId === answerResults[answerIndex]
                  );
                answerIndex++;
                const optionIndex = answerIndex;
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline-block",
                      width: "100px",
                      borderBottom: `2px solid ${colors.primaryColor}`,
                      position: "relative",
                      margin: "0 5px",
                      textAlign: "center",
                    }}
                  >
                    {formViewingMode &&
                      correctAnswerText &&
                      correctAnswerText.optionText !== optionText && (
                        <Typography position="absolute" top="-18px">
                          {correctAnswerText.optionText}
                        </Typography>
                      )}
                    {optionText && (
                      <Typography
                        color={colors.primaryColor}
                        fontSize={isMobile ? "14px" : "16px"}
                        data-option-id={optionIndex}
                        sx={{
                          backgroundColor: !formViewingMode
                            ? "transparent"
                            : correctAnswerText?.optionText === optionText
                            ? colors.selectedCorrectOptionBackground
                            : colors.selectedWrongOptionBackground,
                        }}
                        onClick={(e) => {
                          const optionIndex = Number(
                            e.currentTarget.getAttribute("data-option-id")
                          );
                          const selectedOption =
                            answer.selectedOptions?.[optionIndex];
                          if (selectedOption) {
                            returnAnswerBackToOption(selectedOption);
                          }
                        }}
                      >
                        {optionText}
                      </Typography>
                    )}
                  </div>
                );
              } else {
                return <span key={index}>{item}</span>;
              }
            });
          })()}
        </div>
      ) : (
        question.questionText[0]
      )}
      {question.required && "*"}
    </Typography>
  );
};

export default QuestionText;
