import { Stack, Typography } from "@mui/material";
import React from "react";
import { resultTabs } from "../../utils/constants";
import { colors } from "../../styles/colors";

const ResultTab = ({
  selectedTab,
  setSelectedTab,
  responses,
}: {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  responses: number;
}) => {
  return (
    <Stack direction="row" padding="0 20px" bgcolor={colors.white} gap="30px">
      {resultTabs.map((tab, index) => (
        <Typography
          key={index}
          height="40px"
          sx={{ cursor: "pointer" }}
          borderBottom={
            selectedTab === index ? `2px solid ${colors.black}` : "none"
          }
          onClick={() => setSelectedTab(index)}
        >
          {tab}
          {index === 2 && (
            <span style={{ color: colors.black }}> [{responses}]</span>
          )}
        </Typography>
      ))}
    </Stack>
  );
};

export default ResultTab;
