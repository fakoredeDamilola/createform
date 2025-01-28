import { Button } from "@mui/material";
import { colors } from "../../styles/colors";

const SubmitButton = ({
  notLastQuestion,
  disableCheckButton,
  showAnswerDetails,
  validateQuestionWithRule,
  submitForm,
  popQuiz,
  submitPopQuiz,
  children,
}: {
  notLastQuestion: boolean;
  validateQuestionWithRule: (direction: number) => void;
  submitForm: () => void;
  showAnswerDetails: boolean;
  disableCheckButton: boolean;
  submitPopQuiz: () => void;
  popQuiz: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <>
      {!popQuiz ? (
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            notLastQuestion ? validateQuestionWithRule(1) : submitForm()
          }
          sx={{
            bgcolor: colors.bgOptionText,
            color: colors.white,
            fontSize: "20px",
          }}
        >
          {notLastQuestion ? "OK" : "Submit"}
        </Button>
      ) : showAnswerDetails ? (
        children
      ) : (
        <Button
          fullWidth
          variant="contained"
          onClick={submitPopQuiz}
          disabled={disableCheckButton}
          sx={{
            bgcolor: colors.bgOptionText,
            color: colors.white,
            fontSize: "20px",
          }}
        >
          Check
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
