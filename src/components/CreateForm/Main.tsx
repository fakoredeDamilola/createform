import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { DeviceOrientation, QuestionType } from "../../utils/constants";
import { colors } from "../../styles/colors";
import { useDispatch } from "react-redux";
import {
  addNewQuestionToForm,
  setOpenPublishModal,
  updateQuestionInfo,
} from "../../store/slices/form.slice";
import { IForm } from "../../interfaces/IForm";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import AutoGrowingTextArea from "../AutoGrowingTextArea";
import FormElementModal from "../modals/FormElementModal";
import CreateQuestionOptions from "./CreateQuestionOptions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FormSettingModal from "../modals/FormSettingModal";
import PublishFormModal from "../modals/PublishFormModal";

interface IProps {
  form: IForm;
}

const Main = ({ form }: IProps) => {
  const { selectedQuestion, openPublishModal, formString } = useSelector(
    (state: RootState) => state.form
  );

  const [deviceOrientation, setDeviceOrientation] = useState(
    DeviceOrientation.mobile
  );
  const [questionText, setQuestionText] = useState(
    selectedQuestion?.questionText || ""
  );
  const [questionDescription, setQuestionDescription] = useState(
    selectedQuestion?.questionDescription || ""
  );
  const [openCreateFormElementModal, setOpenCreateFormElementModal] =
    useState(false);
  const [openFormSettingModal, setOpenFormSettingModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedQuestion) {
      setQuestionText(selectedQuestion.questionText);
      setQuestionDescription(selectedQuestion.questionDescription);
    }
  }, [selectedQuestion]);

  const changeDeviceOrientation = () => {
    setDeviceOrientation(
      deviceOrientation === DeviceOrientation.desktop
        ? DeviceOrientation.mobile
        : DeviceOrientation.desktop
    );
  };

  const createNewQuestion = (questionType: QuestionType) => {
    dispatch(addNewQuestionToForm({ questionType }));
  };

  const updateQuestionDetails = (value: string, key: string) => {
    if (value.length % 3 === 0) {
      if (form._id && selectedQuestion?.questionId) {
        dispatch(
          updateQuestionInfo({
            questionId: selectedQuestion?.questionId,
            value,
            key,
          })
        );
      }
    }
  };

  return (
    <Box maxWidth="calc(100% -500px)" width="100%">
      <MainHeader
        setOpenCreateFormElementModal={setOpenCreateFormElementModal}
        setOpenFormSettingModal={setOpenFormSettingModal}
        deviceOrientation={deviceOrientation}
        changeDeviceOrientation={changeDeviceOrientation}
      />
      <Stack
        width="40%"
        height="86%"
        margin="20px auto"
        border={`1px solid ${colors.borderTwo}`}
        sx={{
          overflowY: "scroll",
        }}
        alignItems="center"
        flexDirection="row"
        padding=" 20px"
        boxSizing="border-box"
      >
        <Box>
          <Stack direction="row" width="100%">
            <Typography>{selectedQuestion?.questionNumber}</Typography>
            <ArrowRightAltOutlined
              style={{ fontSize: "10px", marginTop: "7px" }}
            />
            <Box>
              <AutoGrowingTextArea
                fontSize="16px"
                placeholder="Your question here"
                value={questionText}
                setValue={(value: string) => {
                  setQuestionText(value);
                  updateQuestionDetails(value, "questionText");
                }}
              />
              <AutoGrowingTextArea
                fontSize="12px"
                placeholder="Description (optional)"
                value={questionDescription}
                setValue={(value: string) => {
                  setQuestionDescription(value);
                  updateQuestionDetails(value, "questionDescription");
                }}
              />
              {selectedQuestion?.questionType === QuestionType.short_text ||
              selectedQuestion?.questionType === QuestionType.long_text ||
              selectedQuestion?.questionType === QuestionType.email ||
              selectedQuestion?.questionType === QuestionType.number ? (
                <input
                  placeholder={
                    selectedQuestion?.questionType === QuestionType.email
                      ? "name@example.com"
                      : "Type your answer here..."
                  }
                  style={{
                    fontSize: "22px",
                    width: "100%",
                    border: `none`,

                    backgroundColor: "transparent",
                    paddingBottom: "5px",
                  }}
                  disabled
                />
              ) : selectedQuestion?.questionType ===
                  QuestionType.multiple_choice ||
                selectedQuestion?.questionType === QuestionType.boolean ? (
                <CreateQuestionOptions
                  questionId={selectedQuestion.questionId}
                  questionType={selectedQuestion.questionType}
                />
              ) : null}
            </Box>
          </Stack>
        </Box>
      </Stack>

      <FormElementModal
        createNewQuestion={createNewQuestion}
        isOpen={openCreateFormElementModal}
        onClose={() => setOpenCreateFormElementModal(false)}
      />

      <FormSettingModal
        formId={form._id}
        isOpen={openFormSettingModal}
        onClose={() => setOpenFormSettingModal(false)}
      />
      <PublishFormModal
        formURL={`${formString}/${form.slug}`}
        onClose={() => dispatch(setOpenPublishModal(false))}
        isOpen={openPublishModal}
      />
    </Box>
  );
};

export default Main;
