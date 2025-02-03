import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import {
  DeviceOrientation,
  FormItemType,
  QuestionType,
} from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  addNewQuestionToForm,
  setOpenPublishModal,
  updateQuestionInfo,
} from "../../store/slices/form.slice";
import FormElementModal from "../modals/FormElementModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FormSettingModal from "../modals/FormSettingModal";
import PublishFormModal from "../modals/PublishFormModal";
import { buildNewQuestion } from "../../utils/functions";
import useDebounce from "../../hooks/useDebounce";
import { IQuestion } from "../../interfaces/IQuestion";
import CreateQuestionSheet from "./CreateQuestionSheet";
import CreateFormStaticSheet from "./CreateFormStaticSheet";
import { IStaticPage } from "../../interfaces/IStaticPage";

const Main = () => {
  const { selectedQuestion, openPublishModal, formString, form } = useSelector(
    (state: RootState) => state.form
  );

  const [deviceOrientation, setDeviceOrientation] = useState(
    DeviceOrientation.mobile
  );
  const [debouncedQuestionText, setDebouncedQuestionText] = useState("");
  const debouncedQuestion = useDebounce(debouncedQuestionText, 500);

  const [questionDescription, setQuestionDescription] = useState<string>("");
  const [openCreateFormElementModal, setOpenCreateFormElementModal] =
    useState(false);
  const [openFormSettingModal, setOpenFormSettingModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selectedQuestion &&
      selectedQuestion.formItemType === FormItemType.QUESTION
    ) {
      setDebouncedQuestionText((selectedQuestion as IQuestion).questionText);
      setQuestionDescription(
        (selectedQuestion as IQuestion).questionDescription
      );
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (debouncedQuestion !== "") {
      updateQuestionDetails(debouncedQuestion, "questionText");
    }
  }, [debouncedQuestion, dispatch]);

  const changeDeviceOrientation = () => {
    setDeviceOrientation(
      deviceOrientation === DeviceOrientation.desktop
        ? DeviceOrientation.mobile
        : DeviceOrientation.desktop
    );
  };

  const createNewQuestion = async (questionType: QuestionType) => {
    const response = await buildNewQuestion(
      form.questions[form.questions.length - 1].questionNumber + 1,
      questionType,
      form._id
    );
    dispatch(addNewQuestionToForm({ questionInfo: response }));
  };

  const updateQuestionDetails = (value: string, key: string) => {
    if (form._id && selectedQuestion?.questionId) {
      dispatch(
        updateQuestionInfo({
          questionId: selectedQuestion?.questionId,
          value,
          key,
        })
      );
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
      {selectedQuestion.formItemType === FormItemType.QUESTION ? (
        <CreateQuestionSheet
          form={form}
          selectedQuestion={selectedQuestion as IQuestion}
          addAnswerToQuestion={form.formSettings.addAnswerToQuestion}
          updateQuestionDetails={updateQuestionDetails}
          questionDescription={questionDescription}
          setQuestionDescription={setQuestionDescription}
          debouncedQuestionText={debouncedQuestionText}
          setDebouncedQuestionText={setDebouncedQuestionText}
        />
      ) : selectedQuestion.formItemType === FormItemType.STATIC ? (
        <CreateFormStaticSheet staticSheet={selectedQuestion as IStaticPage} />
      ) : (
        <div>yes</div>
      )}

      <FormElementModal
        createNewQuestion={createNewQuestion}
        isOpen={openCreateFormElementModal}
        onClose={() => setOpenCreateFormElementModal(false)}
      />

      <FormSettingModal
        isOpen={openFormSettingModal}
        onClose={() => setOpenFormSettingModal(false)}
        form={form}
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
