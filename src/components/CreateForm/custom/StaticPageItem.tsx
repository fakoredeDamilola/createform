import { IStaticPage } from "../../../interfaces/IStaticPage";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { colors } from "../../../styles/colors";
import { useDispatch } from "react-redux";
import Icon from "../../Icon";
import { selectAQuestion } from "../../../store/slices/form.slice";

const StaticPageItem = ({ staticPage }: { staticPage: IStaticPage }) => {
  const dispatch = useDispatch();

  const { questionId: selectedQuestionId } = useSelector(
    (state: RootState) => state.form.selectedQuestion
  );

  const selectQuestion = () => {
    dispatch(selectAQuestion({ questionId: staticPage.questionId }));
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      width="90%"
      height="50px"
      bgcolor={
        selectedQuestionId === staticPage.questionId
          ? colors.questionTabBackground
          : "transparent"
      }
      margin="auto"
      borderRadius="12px"
      boxSizing="border-box"
      padding="10px"
      onClick={selectQuestion}
      sx={{
        transition: "0.3s all",
        "&:hover": {
          backgroundColor: colors.questionTabBackground,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        height="100%"
        bgcolor={colors.questionTabNumber}
        color={colors.borderTwoText}
        borderRadius="6px"
        padding="2px 6px"
        width="60px"
      >
        <Icon
          fontSize="24px"
          iconName={staticPage.formStaticType.toLowerCase()}
          withBg={false}
        />
        <Typography fontSize="18px">{staticPage.formStaticType[0]}</Typography>
      </Stack>
      <Typography
        overflow="hidden"
        px="5px"
        fontSize="12px"
        maxWidth="60%"
      ></Typography>
    </Stack>
  );
};

export default StaticPageItem;
