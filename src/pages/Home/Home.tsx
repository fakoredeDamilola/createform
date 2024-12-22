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
                Use AI to convert customers’ testimonies into new sales
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
                Text and video testimonials from your customers are scattered
                all over the internet. Collect and incorporate them into your
                sales funnel fast and easy. No need for website hosting. No need
                for advanced tools.
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
                <PlayCircle sx={{ fontSize: "30px" }} />
                <span style={{ marginTop: "3px" }}>Schedule a Demo</span>
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
            <img
              src="https://custimony.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.40d1c4da.png&w=3840&q=75"
              style={{ width: "100%" }}
            />
            <Box sx={{ position: "absolute", top: "100px", left: "50px" }}>
              <img src={arrow} width="100px" />
            </Box>
            <Box sx={{ position: "absolute", bottom: "100px", right: "20px" }}>
              <img src={arrowTwo} width="50px" />
            </Box>
            <Box sx={{ position: "absolute", top: "30%", left: "-20%" }}>
              <img
                src="https://custimony.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FtestimonyBoxOne.34508964.png&w=3840&q=75"
                width="190px"
              />
            </Box>
            <Box sx={{ position: "absolute", top: "10%", right: "-20%" }}>
              <img
                src="https://custimony.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FtestimonyBoxTwo.cb1e4d32.png&w=3840&q=75"
                width="190px"
              />
            </Box>
          </Box>
        </HomeStackStyles>
        <Box mb="30px">
          <TrustedBy />
        </Box>

        <Box width="95%" margin="auto">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color={colors.black}
            textAlign="center"
            margin="70px auto"
          >
            Typeform helps you understand customers
          </Typography>

          <Advantages />
          <Testimonials />
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
        <Typography color={colors.white}>With love, from Barcelona</Typography>
        <Typography color={colors.white}>© Typeform</Typography>
      </Stack>
    </Container>
  );
};

export default Home;
