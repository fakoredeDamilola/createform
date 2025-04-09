import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import imageOne from "../../assets/section-1.png";
import imageTwo from "../../assets/section-2.jpg";
import theme from "../../styles/theme";
import { colors } from "../../styles/colors";

const Advantages = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const advantageText = [
    {
      imageUrl: imageOne,
      headingText: "FORMS, SURVEYS, AND QUIZZES",
      mainText: "Get up to 3.5x more insights on students and learners.",
      subText:
        "Engaging quizzes and interactive formats lead to more participation and better understanding.",
    },
    {
      imageUrl: imageTwo,
      headingText: "CUSTOMER INTELLIGENCE",
      mainText: "Use that data to enhance learning and research.",
      subText:
        "Track student progress, understand learning patterns, and improve assessments with smart insights.",
    },
  ];
  return (
    <Box my="90px">
      {advantageText.map((advantage, index) => {
        return (
          <Stack
            key={index}
            margin="auto"
            direction={
              isMobile ? "column" : index === 1 ? "row-reverse" : "row"
            }
            mt={index === 1 ? "150px" : "0"}
            width={isMobile ? "100%" : "80%"}
          >
            <Stack
              width={isMobile ? "100%" : "50%"}
              justifyContent="center"
              boxSizing="border-box"
            >
              <Box
                width={isMobile ? "100%" : "80%"}
                marginLeft={!isMobile && index === 1 ? "20%" : "0"}
                textAlign={isMobile ? "center" : "left"}
              >
                <Typography fontSize="18px" sx={{ color: colors.black }}>
                  {advantage.headingText}
                </Typography>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{ color: colors.black }}
                  my="30px"
                >
                  {advantage.mainText}
                </Typography>
                <Typography
                  fontSize="18px"
                  sx={{ color: colors.black }}
                  display={isMobile ? "none" : "block"}
                >
                  {advantage.subText}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "150px",
                    height: "50px",
                    fontSize: "18px",
                    mt: "30px",
                    display: isMobile ? "none" : "block",
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Stack>
            <Box width={isMobile ? "100%" : "50%"} my={isMobile ? "25px" : "0"}>
              <img src={advantage.imageUrl} style={{ width: "100%" }} />
            </Box>
            <Box display={isMobile ? "block" : "none"} textAlign="center">
              <Typography fontSize="14px" sx={{ color: colors.black }}>
                {advantage.subText}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  width: "150px",
                  height: "50px",
                  fontSize: "18px",
                  mt: "30px",
                }}
              >
                Sign up
              </Button>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
};

export default Advantages;
