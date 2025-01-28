import { Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createResponseApi,
  getFormBySlug,
  getResponseById,
  updateFormInsightApi,
} from "../api/dashboard.api";
import { useDispatch } from "react-redux";
import {
  getFormDetails,
  setTimeStarted,
  updateResponseDetails,
} from "../store/slices/content.slice";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { routes } from "../utils/routes";
import { getResponseArrayFromForm } from "../utils/functions";
import { IAnswer } from "../interfaces/IAnswer";
import { IForm } from "../interfaces/IForm";
import { ResponseType } from "../utils/constants";
import { localStorageService } from "../factory/classes/LocalStorage";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [responseId, setResponseId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getFormBySlug", params.slug],
    queryFn: ({ queryKey }) => getFormBySlug(queryKey[1] as string),
    enabled: !!params.slug,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { data: responseInfo, refetch } = useQuery({
    queryKey: ["getResponseById", responseId],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1] as string;
      return getResponseById(id);
    },
    enabled: false,
  });

  console.log({ data, isLoading, error, responseInfo });

  const { mutate } = useMutation({
    mutationFn: updateFormInsightApi,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createResponseApi,
    onSuccess: (data) => {
      // console.log("Item created successfully:", data);
      const response = data.data.response;
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
      // get the responseInfo and update
      const responseData = localStorageService.get("responseData") as {
        responseId: string;
      };
      const responseId = responseData.responseId;
      setResponseId(responseId);
      const { data } = await refetch();
      console.log(data?.data);
      dispatch(
        updateResponseDetails({
          response: data?.data,
        })
      );
    } else {
      mutateAsync({
        answers,
        formId: form._id,
        formSlug: form.slug,
        timeStarted,
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
    dispatch(getFormDetails({ form: data?.data }));
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
