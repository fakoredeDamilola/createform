import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";

import testImg from "../../assets/testimonial-img.webp";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

const Testimonials = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      flexDirection={isMobile ? "column" : "row"}
      sx={{
        margin: "0 auto",
        backgroundColor: colors.testimonyBg,
        borderRadius: "50px",
        padding: isMobile ? "20px" : "0px 120px",
      }}
      justifyContent="space-around"
      gap="30px"
    >
      <Stack
        justifyContent="center"
        alignItems={isMobile ? "center" : "auto"}
        width={isMobile ? "100%" : "60%"}
      >
        <Typography
          variant="h3"
          fontSize={isMobile ? "28px" : "auto"}
          color={colors.black}
          my="30px"
          textAlign="center"
        >
          “We need to know that we're building the right things for real
          problems.”
        </Typography>
        <Typography fontSize="18px" textAlign={isMobile ? "center" : "left"}>
          Chase Clark, Senior UX Researcher at Calm, explains why they switched
          to Typeform.
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
      </Stack>
      <Box>
        <img src={testImg} width={isMobile ? "100%" : "450px"} />
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ display: isMobile ? "flex" : "none" }}
      >
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
      </Stack>
    </Stack>
  );
};

export default Testimonials;
