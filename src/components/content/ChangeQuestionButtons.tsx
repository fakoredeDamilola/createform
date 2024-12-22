import { Stack, useMediaQuery } from "@mui/material";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

interface IChangeQuestionButtons {
  currentIndex: number;
  changeQuestion: (value: number) => void;
  noOfQuestions: number;
  children: React.ReactNode;
}

const ChangeQuestionButtons = ({
  currentIndex,
  changeQuestion,
  noOfQuestions,
  children,
}: IChangeQuestionButtons) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction="row"
      width="100%"
      margin="30px 0"
      position={isMobile ? "absolute" : "static"}
      bottom="30px"
      left="0"
      padding={isMobile ? "0 10px" : "0"}
      gap={isMobile ? "8px" : "0"}
      justifyContent={isMobile ? "auto" : "flex-end"}
    >
      <Stack
        display="row"
        justifyContent="center"
        alignItems="center"
        width="50px"
        padding="10px 5px"
        boxSizing="border-box"
        direction="row"
        gap="8px"
        fontSize="14px"
        sx={{
          backgroundColor: colors.bgOptionText,
          borderRadius: isMobile ? "8px" : "8px 0 0 8px",
          cursor: "pointer",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor:
              currentIndex > 0 ? colors.bgOptionTextHover : colors.bgOptionText,
          },
        }}
        onClick={() => {
          if (currentIndex > 0) {
            changeQuestion(-1);
          }
        }}
      >
        <FaChevronUp
          fontSize="22px"
          style={{
            color: currentIndex > 0 ? colors.white : colors.coolGray,
          }}
        />
      </Stack>
      {isMobile && children}
      <Stack
        display="row"
        justifyContent="center"
        alignItems="center"
        width="50px"
        padding="10px 5px"
        boxSizing="border-box"
        direction="row"
        gap="8px"
        fontSize="14px"
        sx={{
          backgroundColor: colors.bgOptionText,
          borderRadius: isMobile ? "8px" : "0px 8px 8px 0",
          cursor: "pointer",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: colors.bgOptionTextHover,
          },
        }}
        onClick={() => {
          if (currentIndex + 1 < (noOfQuestions ?? 0)) {
            changeQuestion(1);
          }
        }}
      >
        <FaChevronDown
          fontSize="22px"
          style={{
            color:
              currentIndex + 1 < (noOfQuestions ?? 0)
                ? colors.white
                : colors.coolGray,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ChangeQuestionButtons;
