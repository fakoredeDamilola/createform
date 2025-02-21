import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

const StatisticsData = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const statisticsInfo = [
    {
      value: "96%",
      text: "of customers say they have a better brand experience",
    },
    {
      value: "95%",
      text: "of customers say they gather more data, more easily",
    },
    {
      value: "87%",
      text: "of customers say they reveal deeper insights from data",
    },
  ];
  return (
    <Box>
      <Box mt="120px" mb="70px">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          textAlign="center"
          color={colors.black}
        >
          Why Typeform?
        </Typography>
        <Typography
          fontSize={isMobile ? "16px" : "18px"}
          textAlign="center"
          mt="20px"
          color={colors.black}
        >
          Because after switching to us...
        </Typography>
      </Box>
      <Stack
        justifyContent="space-around"
        flexDirection={isMobile ? "column" : "row"}
        gap="0px"
        width="80%"
        margin="auto"
      >
        {statisticsInfo.map((stat, index) => {
          return (
            <Box key={index} textAlign="center" my={isMobile ? "20px" : 0}>
              <Typography variant={isMobile ? "h3" : "h2"} color={colors.black}>
                {stat.value}
              </Typography>
              <Typography
                my={isMobile ? "10px" : 0}
                color={colors.black}
                width={isMobile ? "100%" : "200px"}
                fontSize={isMobile ? "16px" : "18px"}
              >
                {stat.text}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default StatisticsData;
