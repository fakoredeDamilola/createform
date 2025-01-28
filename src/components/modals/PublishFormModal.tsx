import React, { useState } from "react";
import { ModalBackdrop, ModalContent } from "./styles";
import { colors } from "../../styles/colors";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

interface PublishFormModalProps {
  isOpen: boolean;
  formURL: string;
  onClose: () => void;
}

const PublishFormModal: React.FC<PublishFormModalProps> = ({
  isOpen,
  formURL,
  onClose,
}) => {
  const [copyText, setCopyText] = useState(false);

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(formURL).then(
      () => {
        setCopyText(true);
        setTimeout(() => setCopyText(false), 3000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent
        width="70%"
        style={{ backgroundColor: colors.secondaryColor, padding: "30px" }}
      >
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
        <Stack direction="row" width="100%" borderRadius="20px 20px 0 0">
          <Box pb="20px" width="100%">
            <Typography fontSize="24px" textAlign="center">
              Your Form has been published!
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          gap="20px"
          bgcolor={colors.white}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="90%"
        >
          <Stack
            border="1px solid black"
            paddingLeft="10px"
            borderRadius="8px"
            width="55%"
            my="30px"
            flexDirection="row"
            alignItems="center"
            position="relative"
            height="40px"
          >
            <Typography fontSize="17px" textAlign="left">
              {formURL}
            </Typography>
            <Button
              variant="contained"
              onClick={copyTextToClipboard}
              sx={{
                position: "absolute",
                right: "3px",
                top: "2px",
              }}
            >
              {copyText ? "Copied" : "Copy"}
            </Button>
          </Stack>
        </Stack>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default PublishFormModal;
