import { Stack, Typography } from "@mui/material";
import { colors } from "../../../styles/colors";
import { Cancel } from "@mui/icons-material";

const ActionTab = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <Stack
      flexDirection="row"
      border={`1px solid ${colors.borderTwoText}`}
      padding="5px 13px"
      borderRadius="5px"
      width="fit-content"
      gap="5px"
    >
      <Typography fontSize="14px">{text}</Typography>
      <Cancel
        sx={{ fontSize: "18px", marginTop: "2px", cursor: "pointer" }}
        onClick={onClick}
      />
    </Stack>
  );
};

export default ActionTab;
