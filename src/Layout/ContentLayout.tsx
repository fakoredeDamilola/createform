import { Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createResponseApi,
  getFormBySlug,
  updateFormInsightApi,
} from "../api/dashboard.api";
import { useDispatch } from "react-redux";
import {
  getFormDetails,
  setTimeStarted,
  updateResponseDetails,
} from "../store/slices/content.slice";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { routes } from "../utils/routes";
import { getResponseArrayFromForm } from "../utils/functions";
import { IAnswer } from "../interfaces/IAnswer";
import { IForm } from "../interfaces/IForm";
import { ResponseType } from "../utils/constants";
import { localStorageService } from "../factory/classes/LocalStorage";
import axiosClient from "../axiosMethod";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getFormBySlug", params.slug],
    queryFn: ({ queryKey }) => getFormBySlug(queryKey[1] as string),
    enabled: !!params.slug,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  console.log({ data, isLoading, error });

  const { mutate } = useMutation({
    mutationFn: updateFormInsightApi,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createResponseApi,
    onSuccess: (data) => {
      const response = data.data.response;
      console.log({ response });
      dispatch(updateResponseDetails({ response }));
      localStorageService.create("responseData", {
        responseId: response._id,
        completed: false,
      });
    },
    onError: (error) => {
      // console.error("Error creating item:", error);
    },
  });

  useEffect(() => {
    if (data) {
      setUpContentFormPage();
    }
  }, [data, dispatch]);

  const createNewResponses = async (
    answers: IAnswer[],
    form: IForm,
    timeStarted: number
  ) => {
    const responseData = localStorageService.exists("responseData");
    if (responseData) {
      const responseData = localStorageService.get("responseData") as {
        responseId: string;
      };
      const responseId = responseData.responseId;
      const response = await axiosClient.get(`/response/get/${responseId}`);

      dispatch(
        updateResponseDetails({
          response: response?.data,
        })
      );
    } else {
      mutateAsync({
        answers,
        formId: form._id,
        formSlug: form.slug,
        timeStarted,
        encryptionArray: form.encryptionDetails,
        responseType: ResponseType.CREATE,
      });
    }
  };

  const setUpContentFormPage = () => {
    mutate({ formID: data?.data._id, formInsight: { views: 1 } });
    const createAnswerResponses = getResponseArrayFromForm(
      data?.data.questions
    );
    const timeStarted = new Date().getTime();
    createNewResponses(createAnswerResponses, data?.data, timeStarted);
    dispatch(
      getFormDetails({ form: data?.data, answers: createAnswerResponses })
    );
    dispatch(setTimeStarted({ timeStarted }));
  };

  if (isLoading) <Spinner />;
  if (data) {
    return (
      <Stack width="100%" height="100vh" position="relative">
        {children}
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack
        width="100%"
        height="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Typography fontSize="25px">This form has been closed</Typography>
        <Typography
          mt="20px"
          fontSize="18px"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(routes.home)}
        >
          Create a form with createform 🤪
        </Typography>
      </Stack>
    );
  }
};

export default ContentLayout;
