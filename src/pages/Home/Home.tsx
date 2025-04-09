import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { colors } from "../../styles/colors";
import {
  HomeStackStyles,
  StartButtonStyle,
  ScheduleButtonStyle,
  Container,
} from "./styles";
import arrow from "../../assets/arrow.svg";
import arrowTwo from "../../assets/arrowTwo.svg";
import arrowThree from "../../assets/arrowThree.svg";
import brand from "../../assets/brand.png";
import { PlayCircle } from "@mui/icons-material";
import theme from "../../styles/theme";
import TrustedBy from "../../components/Home/TrustedBy";
import Testimonials from "../../components/Home/Testimonials";
import Features from "../../components/Home/Features";
import Integrations from "../../components/Home/Integrations";
import StatisticsData from "../../components/Home/StatisticsData";
import Advantages from "../../components/Home/Advantages";

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Header />
      <Box
        paddingBottom="80px"
        bgcolor={colors.white}
        borderRadius={isMobile ? "0 0 80px 80px" : "0 0 140px 140px"}
      >
        <HomeStackStyles mobile={isMobile}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: isMobile ? "100%" : "80%",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: colors.black,
                  fontWeight: 600,
                  position: "relative",
                  zIndex: 5,
                  fontSize: isMobile ? "25px" : "auto",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                Create Engaging Pop Quizzes, MCQs and More
              </Typography>
              <Typography
                sx={{
                  color: colors.muted,
                  textAlign: isMobile ? "center" : "justify",
                  fontSize: "20px",
                  width: isMobile ? "100%" : "80%",
                  marginTop: "20px",
                }}
              >
                Design interactive quizzes, pop quizzes, and multiple-choice
                questions (MCQs) effortlessly. Whether you're a student,
                educator, or researcher, transform ideas into engaging
                assessments with easy-to-use tools. No coding required. No
                complex setup—just seamless quiz creation!
              </Typography>
            </Box>
            <Stack
              sx={{ margin: "40px 0" }}
              direction="row"
              alignItems="center"
              gap={isMobile ? "10px" : "40px"}
              position="relative"
            >
              <StartButtonStyle mobile={isMobile}>Get Started</StartButtonStyle>
              <ScheduleButtonStyle mobile={isMobile}>
                <PlayCircle
                  sx={{ fontSize: "30px", marginTop: isMobile ? "2px" : "0px" }}
                />
                <span style={{ marginTop: isMobile ? "8px" : "3px" }}>
                  Schedule a Demo
                </span>
              </ScheduleButtonStyle>
              <Box
                sx={{
                  position: "absolute",
                  top: "-22%",
                  right: "10%",
                  display: isMobile ? "none" : "block",
                }}
              >
                <img src={arrowThree} width="140px" />
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              width: "50%",
              minWidth: "50%",
              position: "relative",
              zIndex: 5,
              marginTop: "-150px",
              display: isMobile ? "none" : "block",
            }}
          >
            <img src={brand} style={{ width: "70%", marginTop: "40px" }} />
            <Box sx={{ position: "absolute", top: "100px", left: "50px" }}>
              <img src={arrow} width="100px" />
            </Box>
            <Box sx={{ position: "absolute", bottom: "100px", right: "20px" }}>
              <img src={arrowTwo} width="50px" />
            </Box>
          </Box>
        </HomeStackStyles>
        <Box mb="30px">
          <TrustedBy />
        </Box>

        <Box width="95%" margin="auto">
          <Box id="solution">
            <Typography
              variant={isMobile ? "h4" : "h3"}
              color={colors.black}
              textAlign="center"
              margin="70px auto"
            >
              Createform helps students and educators create and analyze
              quizzes.
            </Typography>

            <Advantages />
            <Testimonials />
          </Box>

          <Box>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              textAlign="center"
              width={isMobile ? "100%" : "60%"}
              margin="40px auto"
              sx={{ color: colors.black }}
              my="80px"
            >
              With a superior form of data collection
            </Typography>

            <Features />
          </Box>

          <Box my="100px">
            <Integrations />
          </Box>
          <StatisticsData />
        </Box>
      </Box>
      <Box py="80px">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          color={colors.white}
          textAlign="center"
          width={isMobile ? "100%" : "60%"}
          margin="auto"
        >
          Start getting to know your customers
        </Typography>
        <Box textAlign="center" my="30px">
          <Button
            variant="contained"
            sx={{
              width: "150px",
              height: "50px",
              borderRadius: "15px",
              backgroundColor: colors.white,
              color: colors.black,
            }}
            // onClick={() => openModal("signup")}
          >
            Sign up
          </Button>
        </Box>
      </Box>
      <Stack
        px="30px"
        flexDirection="row"
        justifyContent="space-between"
        borderTop={`1px solid ${colors.textButton}`}
        py="20px"
      >
        <Typography color={colors.white}>With love, from Nigeria</Typography>
        <Typography color={colors.white}>© Createform</Typography>
      </Stack>
    </Container>
  );
};

export default Home;
