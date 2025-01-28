import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Stack, Switch, Typography } from "@mui/material";
import { colors } from "../../styles/colors";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionType } from "../../utils/constants";
import { updateQuestionInfo } from "../../store/slices/form.slice";

interface IProps {
  selectedQuestion: IQuestion;
}

const QuestionSettings = ({ selectedQuestion }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedQuestion) {
      setQuestionSettings(setQuestionInformationSettings(selectedQuestion));
    }
  }, [selectedQuestion]);

  const setQuestionInformationSettings = (selectedQuestion: IQuestion) => {
    const questionSettings = {
      required: selectedQuestion.required ?? false,
      characterLimit: selectedQuestion.characterLimit ?? false,
      multipleSelection: selectedQuestion.multipleSelection ?? false,
      randomize: selectedQuestion.randomize ?? false,
      timeLimit: selectedQuestion.timeLimit ?? false,
    };
    return questionSettings;
  };

  const [maxCharacters, setMaxCharacters] = useState(
    selectedQuestion.maxCharacters ?? "0"
  );
  const [totalTime, setTotalTime] = useState(selectedQuestion.totalTime ?? "");
  const [questionSettings, setQuestionSettings] = useState(
    setQuestionInformationSettings(selectedQuestion)
  );

  const updateQuestionDetails = (setting: string, value: boolean) => {
    setQuestionSettings((prevState) => {
      const newSettings = { ...prevState, [setting]: value };
      if (setting === "timeLimit") {
        newSettings.required = value;
      }
      return newSettings;
    });
    dispatch(
      updateQuestionInfo({
        questionId: selectedQuestion.questionId,
        value,
        key: setting,
      })
    );
  };

  const updateMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMaxCharacters(value);
    dispatch(
      updateQuestionInfo({
        questionId: selectedQuestion.questionId,
        value,
        key: "maxCharacters",
      })
    );
  };
  const updateTotalTimeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTotalTime(parseFloat(value));
    dispatch(
      updateQuestionInfo({
        questionId: selectedQuestion.questionId,
        value,
        key: "totalTime",
      })
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt="25px"
        alignItems="center"
      >
        <Typography fontSize="14px">Required</Typography>
        <Switch
          checked={questionSettings.required}
          onChange={(e) => updateQuestionDetails("required", e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: colors.softMint,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: colors.softMint,
            },
          }}
        />
      </Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt="25px"
          alignItems="center"
        >
          <Typography fontSize="14px">Time Limit</Typography>
          <Switch
            checked={questionSettings.timeLimit}
            onChange={(e) =>
              updateQuestionDetails("timeLimit", e.target.checked)
            }
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: colors.softMint,
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: colors.softMint,
              },
            }}
          />
        </Stack>
        <input
          type="number"
          style={{
            borderRadius: "8px",
            width: "100%",
            height: "35px",
            border: `1px solid ${colors.buttonBorder}`,
            paddingLeft: "10px",
            display: questionSettings.timeLimit ? "block" : "none",
          }}
          placeholder="0 - 99999999(seconds)"
          value={totalTime}
          onChange={updateTotalTimeValue}
        />
      </Box>

      {selectedQuestion.questionType === QuestionType.short_text && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            my="15px"
            alignItems="center"
          >
            <Typography fontSize="14px">Max characters</Typography>
            <Switch
              checked={questionSettings.characterLimit}
              onChange={(e) =>
                updateQuestionDetails("characterLimit", e.target.checked)
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>
          <input
            type="number"
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "35px",
              border: `1px solid ${colors.buttonBorder}`,
              paddingLeft: "10px",
              display: questionSettings.characterLimit ? "block" : "none",
            }}
            placeholder="0 - 99999999"
            value={maxCharacters}
            onChange={updateMaxValue}
          />
        </>
      )}
      {selectedQuestion.questionType === QuestionType.multiple_choice && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            mt="25px"
            alignItems="center"
          >
            <Typography fontSize="14px">Randomize</Typography>
            <Switch
              checked={questionSettings.randomize}
              onChange={(e) =>
                updateQuestionDetails("randomize", e.target.checked)
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default QuestionSettings;
