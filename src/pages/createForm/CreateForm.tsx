import { Stack, useMediaQuery } from "@mui/material";
import DashboardLayout from "../../Layout/DashboardLayout";

import theme from "../../styles/theme";
import { useEffect, useState } from "react";
import MiniOptionModal from "../../components/CreateForm/MiniOptionModal";
import LeftSideBar from "../../components/CreateForm/LeftSideBar";
import RightSideBar from "../../components/CreateForm/RightSideBar";
import Main from "../../components/CreateForm/Main";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "../../api/dashboard.api";
import { addNewQuestionToForm, setForm } from "../../store/slices/form.slice";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QuestionType } from "../../utils/constants";

const CreateForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form.form);

  const { data, error, isLoading } = useQuery({
    queryKey: ["getFormById", params.formId],
    queryFn: ({ queryKey }) => getFormById(queryKey[1] as string),
    enabled: !!params.formId,
  });

  console.log({
    data,
    error,
    isLoading,
  });

  useEffect(() => {
    if (data) {
      dispatch(setForm({ form: data?.data }));
    }

    if (data?.data.questions.length === 0) {
      dispatch(addNewQuestionToForm({ questionType: QuestionType.short_text }));
    }
  }, [data, dispatch]);

  const [openMiniModal, setOpenMiniModal] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <DashboardLayout>
      {isLoading && <Spinner />}
      {form ? (
        <Stack
          height="100%"
          direction="row"
          gap="20px"
          mt={isMobile ? "250px" : "0"}
          sx={{ overflowY: "hidden" }}
        >
          <LeftSideBar questions={form?.questions} formId={form._id} />
          <Main form={form} />
          <RightSideBar />
        </Stack>
      ) : (
        <Stack>No Form Found</Stack>
      )}

      <MiniOptionModal open={openMiniModal} setOpen={setOpenMiniModal} />
    </DashboardLayout>
  );
};

export default CreateForm;
