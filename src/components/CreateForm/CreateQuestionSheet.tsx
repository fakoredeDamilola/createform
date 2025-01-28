import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import AutoGrowingTextArea from "../AutoGrowingTextArea";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionType } from "../../utils/constants";
import CreateQuestionOptions from "./CreateQuestionOptions";
import ContentSheet from "./custom/ContentSheet";

const CreateQuestionSheet = ({
  selectedQuestion,
  addAnswerToQuestion,
  setQuestionDescription,
  questionDescription,
  updateQuestionDetails,
  debouncedQuestionText,
  setDebouncedQuestionText,
}: {
  selectedQuestion: IQuestion;
  addAnswerToQuestion: boolean;
  setQuestionDescription: React.Dispatch<React.SetStateAction<string>>;
  questionDescription: string;
  updateQuestionDetails: (value: string, key: string) => void;
  debouncedQuestionText: string;
  setDebouncedQuestionText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ContentSheet>
      <Stack direction="row" width="100%">
        <Typography>{selectedQuestion?.questionNumber}</Typography>
        <ArrowRightAltOutlined style={{ fontSize: "10px", marginTop: "7px" }} />
        <Box>
          <AutoGrowingTextArea
            fontSize="16px"
            placeholder="Your question here"
            value={debouncedQuestionText}
            setValue={setDebouncedQuestionText}
          />
          <AutoGrowingTextArea
            fontSize="12px"
            placeholder="Description (optional)"
            value={questionDescription}
            setValue={(value: string) => {
              setQuestionDescription(value);
              updateQuestionDetails(value, "questionDescription");
            }}
          />
          {selectedQuestion?.questionType === QuestionType.short_text ||
          selectedQuestion?.questionType === QuestionType.long_text ||
          selectedQuestion?.questionType === QuestionType.email ||
          selectedQuestion?.questionType === QuestionType.number ? (
            <>
              <input
                placeholder={
                  selectedQuestion?.questionType === QuestionType.email
                    ? "name@example.com"
                    : "Type your answer here..."
                }
                style={{
                  fontSize: "22px",
                  width: "100%",
                  border: `none`,

                  backgroundColor: "transparent",
                  paddingBottom: "5px",
                }}
                disabled
              />
              {addAnswerToQuestion && (
                <Box>
                  <input
                    placeholder="Type keyword of result here"
                    style={{
                      fontSize: "14px",
                      width: "100%",
                      border: "1px solid",
                      padding: "0 10px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "transparent",
                    }}
                  />
                </Box>
              )}
            </>
          ) : selectedQuestion?.questionType === QuestionType.multiple_choice ||
            selectedQuestion?.questionType === QuestionType.boolean ? (
            <CreateQuestionOptions
              _id={selectedQuestion._id ?? ""}
              questionType={selectedQuestion.questionType}
            />
          ) : null}
        </Box>
      </Stack>
    </ContentSheet>
  );
};

export default CreateQuestionSheet;
