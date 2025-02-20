import { useEffect, useState } from "react";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { colors } from "../../styles/colors";
import { IQuestion } from "../../interfaces/IQuestion";
import Icon from "../Icon";
import {
  duplicateQuestion,
  selectAQuestion,
} from "../../store/slices/form.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QuestionType } from "../../utils/constants";

const QuestionListItem = ({
  question,
  deleteQuestionFunc,
}: {
  question: IQuestion;
  formId: string;
  deleteQuestionFunc: (questionId: string) => void;
}) => {
  const dispatch = useDispatch();
  const [showDotsOptions, setShowDotsOptions] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { questionId: selectedQuestionId } = useSelector(
    (state: RootState) => state.form.selectedQuestion
  );

  useEffect(() => {
    if (question.questionType === QuestionType.fill_the_gap) {
      setQuestionText(
        question.questionText
          .map((text) => (text === "" ? "____" : text))
          .join("")
      );
    } else {
      setQuestionText(question.questionText.join(""));
    }

    if (selectedQuestionId === question.questionId) {
      setShowDotsOptions(true);
    } else {
      setShowDotsOptions(false);
    }
  }, [selectedQuestionId, question.questionId]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const duplicateQuestionFunc = () => {
    dispatch(duplicateQuestion({ questionId: question.questionId }));
    handleClose();
  };

  const selectQuestion = () => {
    dispatch(selectAQuestion({ questionId: question.questionId }));
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
        selectedQuestionId === question.questionId
          ? colors.questionTabBackground
          : "transparent"
      }
      margin="auto"
      borderRadius="12px"
      boxSizing="border-box"
      padding="10px"
      onClick={selectQuestion}
      onMouseOver={() => setShowDotsOptions(true)}
      onMouseOut={() =>
        selectedQuestionId !== question.questionId && setShowDotsOptions(false)
      }
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
        <Icon fontSize="24px" iconName={question.questionType} withBg={false} />
        <Typography fontSize="18px">{question.questionNumber}</Typography>
      </Stack>
      <Typography overflow="hidden" px="5px" fontSize="12px" maxWidth="60%">
        {questionText.length > 12
          ? `${questionText?.split("").slice(0, 12).join("")}...`
          : questionText}
      </Typography>
      <>
        <Stack
          direction="row"
          gap="3px"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <HiOutlineDotsVertical
            fontSize="18px"
            style={{
              visibility: showDotsOptions ? "visible" : "hidden",
              cursor: "pointer",
            }}
          />
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            mt: 1,
            "& .MuiPaper-root": {
              position: "absolute",
              left: "0",
              minWidth: 150,
              borderRadius: "8px",
              padding: "4px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <MenuItem sx={{ fontSize: "14px" }} onClick={duplicateQuestionFunc}>
            Duplicate
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "14px" }}
            onClick={() => question?._id && deleteQuestionFunc(question._id)}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    </Stack>
  );
};

export default QuestionListItem;
