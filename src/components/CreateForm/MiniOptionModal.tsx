import React from "react";
import { Modal, Typography, Stack, useMediaQuery, Box } from "@mui/material";
import theme from "../../styles/theme";
import AICreationImage from "../../assets/ai.svg";
import ImportCreationImage from "../../assets/import.svg";
import ScratchCreationImage from "../../assets/scratch.svg";
import { colors } from "../../styles/colors";
import { Close } from "@mui/icons-material";

const MiniOptionModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cardFormCreations = [
    {
      icon: ScratchCreationImage,
      title: "Start from scratch",
      description: "Build from a list of ready-made form elements.",
    },
    {
      icon: ImportCreationImage,
      title: "Import questions",
      description: "Copy and paste questions or import from Google Forms.",
    },
    {
      icon: AICreationImage,
      title: "Create with AI",
      description: " Use AI to help generate questions for any form.",
    },
  ];

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Stack
          alignItems="center"
          sx={{
            position: "relative",
            top: isMobile ? "80%" : "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            overflow: "scroll",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            pt: "40px",
          }}
        >
          <Typography
            fontSize={isMobile ? "18px" : "26px"}
            mb="50px"
            textAlign="center"
          >
            How do you want to build your form
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap="30px"
            alignItems="center"
            my={isMobile ? "auto" : "0"}
          >
            {cardFormCreations.map((card, index) => {
              return (
                <Stack
                  key={index}
                  width={isMobile ? "90%" : "300px"}
                  height="270px"
                  justifyContent="center"
                  padding="0 20px"
                  boxSizing="border-box"
                  alignItems="center"
                  borderRadius="12px"
                  border={`1px solid ${colors.borderTwo}`}
                  bgcolor={colors.white}
                  textAlign="center"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      border: `3px solid ${colors.borderTwo}`,
                    },
                  }}
                >
                  <img src={card.icon} height="50px" />
                  <Typography mt="40px" mb="20px" fontWeight="800">
                    {card.title}
                  </Typography>
                  <Typography color={colors.muted}>
                    {card.description}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <Box
            onClick={handleClose}
            right="10px"
            top="0px"
            sx={{ mt: 2, position: "absolute" }}
          >
            <Close />
          </Box>
        </Stack>
      </Modal>
    </div>
  );
};

export default MiniOptionModal;
