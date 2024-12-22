import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IOption } from "../../interfaces/IOption";
import { colors } from "../../styles/colors";
import AutoGrowingTextArea from "../AutoGrowingTextArea";
import { Cancel } from "@mui/icons-material";

const QuestionOption = ({
  option,
  updateOptionsValue,
  removeOptionFromQuestion,
  noCancelButton,
  contentDisplay,
}: {
  option: IOption;
  updateOptionsValue: (
    value: string,
    optionId: string,
    select?: boolean
  ) => void;
  contentDisplay?: boolean;
  removeOptionFromQuestion: (optionId: string) => void;
  noCancelButton: boolean;
}) => {
  const [questionOptionValue, setQuestionOptionValue] = useState("");
  const [showRemoveQuestionButton, setShowRemoveQuestionButton] =
    useState(false);

  useEffect(() => {
    setQuestionOptionValue(option.optionText);
  }, [option]);

  return (
    <Stack
      key={option.optionId}
      minWidth="150px"
      boxSizing="border-box"
      padding="8px"
      bgcolor={
        option.selectedOption
          ? colors.selectedOptionBackground
          : colors.bgOption
      }
      position="relative"
      minHeight="40px"
      direction="row"
      gap="10px"
      sx={{
        boxShadow: option.selectedOption
          ? colors.selectedOptionBoxShadow
          : colors.optionBoxShadow,
        cursor: "pointer",
      }}
      borderRadius="4px"
      margin="6px 0"
      onMouseOver={() => !noCancelButton && setShowRemoveQuestionButton(true)}
      onMouseOut={() => setShowRemoveQuestionButton(false)}
      onClick={() =>
        updateOptionsValue(option.optionText, option.optionId, true)
      }
    >
      <Stack
        height="100%"
        width="25px"
        borderRadius="4px"
        bgcolor={colors.white}
        sx={{
          boxShadow: option.selectedOption
            ? colors.selectedOptionBoxShadow
            : colors.optionBoxShadow,
        }}
        fontSize="14px"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {option.optionLabel}
      </Stack>
      {contentDisplay ? (
        <Typography>{questionOptionValue}</Typography>
      ) : (
        <AutoGrowingTextArea
          fontSize="14px"
          placeholder=""
          noBgColor={true}
          value={questionOptionValue}
          setValue={(value) => {
            setQuestionOptionValue(value);
            updateOptionsValue(value, option.optionId);
          }}
        />
      )}
      <Box
        width="25px"
        height="25px"
        position="absolute"
        bgcolor="rgba(0,0,0,0.5)"
        color="white"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        fontSize="23px"
        right="-13px"
        top="25%"
        fontWeight="bold"
        display={showRemoveQuestionButton ? "flex" : "none"}
        sx={{ cursor: "pointer" }}
        onClick={() => removeOptionFromQuestion(option.optionId)}
      >
        <Cancel />
      </Box>
    </Stack>
  );
};

export default QuestionOption;
