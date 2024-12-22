import { Stack, Typography } from "@mui/material";

import { CiWarning } from "react-icons/ci";
import { colors } from "../../styles/colors";

const ErrorBox = ({ text }: { text: string }) => {
  return (
    <Stack
      padding="10px"
      borderRadius="3px"
      direction="row"
      gap="10px"
      mt="15px"
      bgcolor={colors.dangerBg}
      minWidth="160px"
      maxWidth="220px"
    >
      <CiWarning
        color={colors.danger}
        fontSize="20px"
        style={{ marginTop: "3px" }}
      />
      <Typography color={colors.danger}>{text}</Typography>
    </Stack>
  );
};

export default ErrorBox;
