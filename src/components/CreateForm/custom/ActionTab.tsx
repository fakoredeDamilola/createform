import { Stack, Typography } from "@mui/material";
import { colors } from "../../../styles/colors";
import { Cancel } from "@mui/icons-material";

const ActionTab = ({
  text,
  onClick,
  showSelectOption,
  selectOptionAsAnswer,
  selectedOption,
}: {
  text: string;
  onClick: () => void;
  showSelectOption?: boolean;
  selectedOption: number | 0;
  selectOptionAsAnswer?: () => void;
}) => {
  return (
    <Stack
      flexDirection="row"
      border={`1px solid ${colors.borderTwoText}`}
      padding="5px"
      borderRadius="5px"
      width="fit-content"
      gap="5px"
    >
      <Typography fontSize="12px">{text}</Typography>
      {showSelectOption && (
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            border: `1px solid ${colors.borderTwoText}`,
            color: colors.black,
            backgroundColor: selectedOption ? colors.mistBlue : "transparent",
            fontSize: "12px",
          }}
          onClick={() => selectOptionAsAnswer && selectOptionAsAnswer()}
        >
          {selectedOption > 0 && selectedOption}
        </Stack>
      )}
      <Cancel
        sx={{ fontSize: "12px", marginTop: "2px", cursor: "pointer" }}
        onClick={onClick}
      />
    </Stack>
  );
};

export default ActionTab;
