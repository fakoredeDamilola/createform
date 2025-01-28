import { Box, Button, Input, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ModalBackdrop, ModalContent } from "./styles";
import { Close } from "@mui/icons-material";

interface InputModalProps {
  onSave: (inputValue: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ isOpen, onSave, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onSave(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent width="40%" height="200px">
        <div
          style={{
            padding: "20px 0",
            position: "absolute",
            right: "30px",
            top: "10px",
          }}
        >
          <Close onClick={onClose} />
        </div>
        <Stack width="100%" p="20px" borderRadius="20px 20px 0 0">
          <Box width="100%">
            <Typography mb="15px" textAlign="left">
              Create a new start page input
            </Typography>
            <Box mb="20px">
              <Input
                sx={{ width: "100%" }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your input"
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "90px",
              height: "35px",
              borderRadius: "5px",
              position: "absolute",
              right: "30px",
              bottom: "20px",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default InputModal;
