import { Box, Button, Input, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import AutoGrowingTextArea from "../AutoGrowingTextArea";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionType } from "../../utils/constants";
import CreateQuestionOptions from "./CreateQuestionOptions";
import ContentSheet from "./custom/ContentSheet";
import { useDispatch } from "react-redux";
import {
  addNewOptionsValue,
  createOrUpdateQuestionAnswer,
  removeOptionsValue,
  selectOptionAsNextAnswer,
} from "../../store/slices/form.slice";
import { IForm } from "../../interfaces/IForm";
import useDebounce from "../../hooks/useDebounce";
import ActionTab from "./custom/ActionTab";
import { IOption } from "../../interfaces/IOption";

const CreateQuestionSheet = ({
  selectedQuestion,
  addAnswerToQuestion,
  setQuestionDescription,
  questionDescription,
  updateQuestionDetails,
  debouncedQuestionText,
  setDebouncedQuestionText,
  form,
}: {
  form: IForm;
  selectedQuestion: IQuestion;
  addAnswerToQuestion: boolean;
  setQuestionDescription: React.Dispatch<React.SetStateAction<string>>;
  questionDescription: string;
  updateQuestionDetails: (value: string, key: string) => void;
  debouncedQuestionText: string;
  setDebouncedQuestionText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [debouncedAnswerInputText, setDebouncedAnswerInputText] = useState("");
  const [inputOptionText, setInputOptionText] = useState("");
  const debouncedAnswerInput = useDebounce(debouncedAnswerInputText, 500);

  const dispatch = useDispatch();
  const addTextAsAnswer = (text: string) => {
    if (selectedQuestion._id) {
      dispatch(
        createOrUpdateQuestionAnswer({
          questionAnswer: text,
          questionId: selectedQuestion._id,
          questionType: selectedQuestion.questionType,
          formId: form._id,
        })
      );
    }
  };

  const submitInputOptionText = () => {
    if (inputOptionText && selectedQuestion._id) {
      dispatch(
        addNewOptionsValue({
          optionText: inputOptionText,
          questionId: selectedQuestion._id,
        })
      );
      setInputOptionText("");
    }
  };

  const selectOptionAsAnswer = (optionId: string) => {
    if (selectedQuestion._id) {
      dispatch(
        selectOptionAsNextAnswer({ questionId: selectedQuestion._id, optionId })
      );
    }
  };

  const removeFromOptionList = (option: IOption) => {
    if (selectedQuestion._id) {
      dispatch(
        removeOptionsValue({
          optionId: option.optionId,
          questionId: selectedQuestion._id,
        })
      );
    }
  };

  useEffect(() => {
    if (debouncedAnswerInput !== "") {
      addTextAsAnswer(debouncedAnswerInput);
    }
  }, [debouncedAnswerInput, dispatch]);

  useEffect(() => {
    if (selectedQuestion.correctAnswer?.answerResults) {
      setDebouncedAnswerInputText(
        selectedQuestion.correctAnswer?.answerResults[0]
      );
    } else {
      setDebouncedAnswerInputText("");
    }
  }, [selectedQuestion]);

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
          selectedQuestion?.questionType === QuestionType.long_text ? (
            <>
              <input
                placeholder={"Type your answer here..."}
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
                      height: "30px",
                      borderRadius: "4px",
                      backgroundColor: "transparent",
                    }}
                    value={debouncedAnswerInputText}
                    onChange={(e) =>
                      setDebouncedAnswerInputText(e.target.value)
                    }
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
          ) : selectedQuestion?.questionType === QuestionType.fill_the_gap ? (
            <Box>
              <Typography sx={{ cursor: "pointer", fontSize: "12px" }}>
                To add a dash at any point, use four underscore (____)
              </Typography>
              {form.formSettings.addAnswerToQuestion && (
                <Typography
                  sx={{ cursor: "pointer", fontSize: "12px", mt: "6px" }}
                >
                  You need to select the answers to the gaps, select them in
                  accordance to the gap
                </Typography>
              )}
              <Stack flexDirection="row" gap="10px" mt="10px" flexWrap="wrap">
                {selectedQuestion.options &&
                  selectedQuestion.options.map((option) => {
                    const optionIndex =
                      selectedQuestion.correctAnswer?.answerResults?.findIndex(
                        (opt) => option.optionId === opt
                      );
                    return (
                      <ActionTab
                        text={option.optionText}
                        key={option.optionId}
                        onClick={() => removeFromOptionList(option)}
                        selectedOption={optionIndex == -1 ? 0 : optionIndex + 1}
                        showSelectOption={form.formSettings.addAnswerToQuestion}
                        selectOptionAsAnswer={() =>
                          selectOptionAsAnswer(option.optionId)
                        }
                      />
                    );
                  })}
              </Stack>
              <Stack direction="row" mt="20px" gap="5px">
                <Input
                  sx={{ width: "100%", my: "10px" }}
                  value={inputOptionText}
                  onChange={(e) => setInputOptionText(e.target.value)}
                  placeholder="Enter a option"
                  name="option"
                />
                <Button
                  onClick={submitInputOptionText}
                  variant="contained"
                  sx={{ height: "30px", mt: "10px" }}
                >
                  submit
                </Button>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Stack>
    </ContentSheet>
  );
};

export default CreateQuestionSheet;
