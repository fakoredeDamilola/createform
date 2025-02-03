import { IStaticPage } from "../../../interfaces/IStaticPage";
import {
  Box,
  Button,
  Input,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../../../styles/colors";
import { useEffect, useState } from "react";
import theme from "../../../styles/theme";

const ContentStartStaticPage = ({
  staticPage,
  encryptionDetails,
  instructions,
  updateEncryptionDetails,
}: {
  staticPage: IStaticPage;
  encryptionDetails: { [key: string]: string };
  instructions: string[];
  updateEncryptionDetails: (updateEncryptionDetails: {
    [key: string]: string;
  }) => void;
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [encryptionInputValues, setEncryptionInputValues] = useState<{
    [key: string]: string;
  } | null>(null);
  const [disableButton, setDisableButton] = useState(true);

  const checkIfInputHasBeenFilled = (encryptionDetails: {
    [key: string]: string;
  }) => {
    const allInputsFilled = Object.values(encryptionDetails || {}).every(
      (value) => value.trim() !== ""
    );
    setDisableButton(!allInputsFilled);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const encryptionDetails = { ...encryptionInputValues, [name]: value };

    setEncryptionInputValues(encryptionDetails);
    checkIfInputHasBeenFilled(encryptionDetails);
  };

  const submitEncrypttionDetails = () => {
    if (encryptionInputValues) {
      updateEncryptionDetails(encryptionInputValues);
    }
  };

  useEffect(() => {
    setEncryptionInputValues(encryptionDetails);
  }, [encryptionDetails]);

  return (
    <Stack
      width="100%"
      height="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Typography fontSize="28px">{staticPage.pageTitle}</Typography>
      {encryptionInputValues && (
        <Box my="30px" width={isMobile ? "80%" : "50%"}>
          {Object.keys(encryptionInputValues).map((input, index) => {
            return (
              <Box>
                <Input
                  key={index}
                  sx={{ width: "100%", my: "15px", fontSize: "24px" }}
                  value={encryptionInputValues[input]}
                  onChange={handleInput}
                  placeholder={`Enter your ${input}`}
                  name={input}
                />
              </Box>
            );
          })}
        </Box>
      )}
      {instructions && (
        <Box my="30px" width={isMobile ? "80%" : "50%"}>
          {instructions.map((instruction, index) => {
            return (
              <Box key={index}>
                <Typography>{instruction}</Typography>
              </Box>
            );
          })}
        </Box>
      )}

      <Button
        variant="contained"
        onClick={submitEncrypttionDetails}
        disabled={disableButton}
        sx={{
          bgcolor: colors.bgOptionText,
          color: colors.white,
          width: isMobile ? "80%" : "50%",
          fontSize: "20px",
        }}
      >
        Start Quiz
      </Button>
    </Stack>
  );
};

export default ContentStartStaticPage;
