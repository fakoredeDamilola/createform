import React, { useState } from "react";
import { CloseButton, ModalBackdrop, ModalContent } from "./styles";
import { Close } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { colors } from "../../styles/colors";
import { QuestionType } from "../../utils/constants";
import Icon from "../Icon";

interface FormElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  createNewQuestion: (questionType: QuestionType) => void;
}

const FormElementModal: React.FC<FormElementModalProps> = ({
  isOpen,
  onClose,
  createNewQuestion,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Add form elements", "import questions", "Create with AI"];

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent width="50%">
        <Stack
          direction="row"
          width="100%"
          left="0"
          top="0"
          borderRadius="20px 20px 0 0"
          padding="0px 30px"
          bgcolor={colors.questionTabBackground}
          justifyContent="space-between"
          position="absolute"
        >
          <Stack direction="row" gap="20px">
            {tabs.map((tab, index) => (
              <Box
                padding="20px 0"
                boxSizing="border-box"
                borderTop={
                  selectedTab === index
                    ? "2px solid black"
                    : `2px solid ${colors.questionTabBackground}`
                }
                key={index}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box>
            <CloseButton style={{ position: "static", padding: "20px 0" }}>
              <Close onClick={onClose} />
            </CloseButton>
          </Box>
        </Stack>

        <Box width="100%" padding="50px">
          {selectedTab === 0 ? (
            <Box>
              {Object.values(QuestionType).map((questionType, index) => (
                <Stack
                  key={index}
                  width="200px"
                  onClick={() => {
                    createNewQuestion(questionType);
                    onClose();
                  }}
                  borderRadius="8px"
                  border={`1px solid ${colors.borderTwo}`}
                  direction="row"
                  alignItems="center"
                  padding="10px 8px"
                  boxSizing="border-box"
                  margin="10px 0;"
                  gap="10px"
                  sx={{
                    transition: "0.3s all",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: colors.questionTabBackground,
                    },
                  }}
                >
                  <Icon fontSize="28px" iconName={questionType} withBg={true} />
                  <Typography fontSize="14px">{questionType}</Typography>
                </Stack>
              ))}
            </Box>
          ) : null}
        </Box>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default FormElementModal;
