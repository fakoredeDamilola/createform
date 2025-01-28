import { Box, Stack } from "@mui/material";
import React from "react";
import { colors } from "../../../styles/colors";

const ContentSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      width="40%"
      height="86%"
      position="relative"
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
      <Box>{children}</Box>
    </Stack>
  );
};

export default ContentSheet;
