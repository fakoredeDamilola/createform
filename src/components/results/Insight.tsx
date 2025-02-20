import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import { IFormInsight } from "../../interfaces/IFormInsight";

const Insight = ({
  formResponseInsights,
}: {
  formResponseInsights: IFormInsight;
}) => {
  const insightTabResults = [
    { name: "Views", value: 0 },
    { name: "Starts", value: 0 },
    { name: "Submissions", value: 0 },
    { name: "Completion rate", value: "0%" },
    { name: "Average Time to complete", value: 0 },
  ];

  const [insightTab, setInsightTab] = useState(insightTabResults);

  useEffect(() => {
    const { starts, views, submitted } = formResponseInsights;
    if (submitted && starts) {
      const completionRate = Math.floor((submitted / starts) * 100);
      setInsightTab([
        { name: "Views", value: views },
        { name: "Start", value: starts },
        { name: "Submissions", value: submitted },
        { name: "Completion rate", value: `${completionRate}%` },
        {
          name: "Average Time to complete",
          value: formResponseInsights.averageTimeToFillForm?.toFixed(4) ?? "0",
        },
      ]);
    }
  }, [formResponseInsights]);

  return (
    <Box>
      <Typography fontSize="24px" my="25px" color={colors.black}>
        Big picture
      </Typography>
      <Stack direction="row" gap="30px">
        {insightTab.map((insight, index) => {
          return (
            <Box key={index}>
              <Typography fontSize="12px">{insight.name}</Typography>
              <Typography color={colors.black} fontSize="45px">
                {insight.value}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Insight;
