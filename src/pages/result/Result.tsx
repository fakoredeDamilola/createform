import DashboardLayout from "../../Layout/DashboardLayout";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFormById } from "../../api/dashboard.api";
import { addResultsToQuestions, setForm } from "../../store/slices/form.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ResultTab from "../../components/results/ResultTab";
import { Box, Stack } from "@mui/material";
import Insight from "../../components/results/Insight";
import Summary from "../../components/results/Summary";
import Responses from "../../components/results/Responses";
import Spinner from "../../components/Spinner";

const Result = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { questionsWithAnswers, form, responses } = useSelector(
    (state: RootState) => state.form
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["getFormById", params.formId],
    queryFn: ({ queryKey }) => getFormById(queryKey[1] as string),
    enabled: !!params.formId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setForm({ form: data?.data }));
      dispatch(
        addResultsToQuestions({
          questions: data?.data?.questions,
          responses: data?.data?.responses,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <DashboardLayout>
      {isLoading && <Spinner />}
      {form && (
        <>
          <ResultTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            responses={responses.length}
          />
          <Box width="100%" p="20px 0px">
            <Stack width="90%" margin="0 auto">
              {selectedTab === 0 ? (
                <Insight
                  formResponseInsights={{
                    ...form.formResponseInsights,
                    averageTimeToFillForm:
                      (form?.responses?.reduce(
                        (acc, current) =>
                          acc + parseFloat(current.totalTimeTaken ?? "0"),
                        0
                      ) ?? 0) / (form.formResponseInsights?.submitted ?? 0),
                  }}
                />
              ) : selectedTab === 1 ? (
                <Summary questionsWithAnswers={questionsWithAnswers} />
              ) : (
                <Responses />
              )}
            </Stack>
          </Box>
        </>
      )}
    </DashboardLayout>
  );
};

export default Result;
