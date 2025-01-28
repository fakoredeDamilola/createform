import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getResponseById } from "../api/dashboard.api";
import { colors } from "../styles/colors";
import Spinner from "../components/Spinner";
import { IAnswer } from "../interfaces/IAnswer";
import { useEffect, useState } from "react";
import { getRoute } from "../utils/routes";

const ResultPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [totalAnswerScore, setTotalAnswerScore] = useState(0);
  const [questionCorrectScore, setQuestionCorrectScore] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["getResponseById", params.responseId],
    queryFn: ({ queryKey }) => getResponseById(queryKey[1] as string),
    enabled: !!params.responseId,
  });

  useEffect(() => {
    if (data?.data) {
      const answers = data?.data.answers;

      setTotalAnswerScore(answers.length);
      const questionsCorrect = answers.reduce(
        (acc: number, curr: IAnswer) => (acc += curr.scoreForQuestion ?? 0),
        0
      );
      setQuestionCorrectScore(questionsCorrect);
    }
  }, [data]);

  const openContentPageWithAnswer = () => {
    const route = getRoute("contentResultPage", { responseId: data?.data._id });
    navigate(route);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      {!isLoading ? (
        <>
          <Typography variant="h2" color={colors.mistBlue}>
            You got{" "}
            <span style={{ fontWeight: 700 }}>{questionCorrectScore}</span> out
            of <span style={{ fontWeight: 700 }}>{totalAnswerScore}</span>{" "}
            questions
          </Typography>

          <Typography
            fontSize="22px"
            marginTop="30px"
            sx={{ cursor: "pointer" }}
            onClick={openContentPageWithAnswer}
          >
            View Questions with answers
          </Typography>
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default ResultPage;
