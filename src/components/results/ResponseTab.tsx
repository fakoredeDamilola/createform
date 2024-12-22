import { Box, Stack } from "@mui/material";
import React from "react";
import { colors } from "../../styles/colors";
import { FileDownloadOutlined, Settings } from "@mui/icons-material";

const ResponseTab = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <input
          style={{
            width: "200px",
            height: "35px",
            padding: "0 5px",
            border: `1px solid ${colors.borderTwoText}`,
            borderRadius: "4px",
          }}
          placeholder="search responses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Stack direction="row" gap="20px">
        <Stack
          justifyContent="center"
          alignItems="center"
          width="35px"
          height="35px"
          borderRadius="4px"
          bgcolor={colors.iconColor}
        >
          <Settings />
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          width="35px"
          height="35px"
          borderRadius="4px"
          bgcolor={colors.iconColor}
        >
          <FileDownloadOutlined />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResponseTab;
