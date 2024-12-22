import { Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFormBySlug, updateFormInsightApi } from "../api/dashboard.api";
import { useDispatch } from "react-redux";
import { getFormDetails, setTimeStarted } from "../store/slices/content.slice";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["getFormBySlug", params.slug],
    queryFn: ({ queryKey }) => getFormBySlug(queryKey[1] as string),
    enabled: !!params.slug,
  });

  const { mutate } = useMutation({
    mutationFn: updateFormInsightApi,
  });

  useEffect(() => {
    if (data) {
      mutate({ formID: data?.data._id, formInsight: { views: 1 } });
      dispatch(getFormDetails({ form: data?.data }));
      dispatch(setTimeStarted());
    }
  }, [data, dispatch]);

  if (isLoading) <Spinner />;
  if (data) {
    return (
      <Stack width="100%" height="100vh" position="relative">
        {children}
      </Stack>
    );
  }
};

export default ContentLayout;
