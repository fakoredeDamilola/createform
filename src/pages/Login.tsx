import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import signupImg from "../assets/signup-img.webp";
import { colors } from "../styles/colors";
import GoogleIcon from "../assets/google.svg";
import { SignUpORStyle } from "../components/modals/styles";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import * as Yup from "yup";
import { GoogleLoginResponse } from "../interfaces/IGoogleResponse";
import axiosClient from "../axiosMethod";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { IEmailArgument } from "../interfaces/IEmailArgument";
import showToast from "../CustomToast";
import { login } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import AuthHeader from "../components/auth/AuthHeader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const setTokenInLocalStorage = (accessToken: string) => {
    localStorage.setItem("token", accessToken);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  });

  const responseMessage = (response: GoogleLoginResponse) => {
    if (response) {
      axiosClient
        .post("/auth/google/create", {
          response,
        })
        .then((res) => {
          setTokenInLocalStorage(res.data.access_token);
          navigate(routes.dashboard);
        })
        .catch((err) => {
          console.error("Error in backend call:", err);
        });
    } else {
      console.log("No credential received");
    }
  };

  // eslint-disable-next-line
  const errorMessage = (error: any) => {
    console.log(error);
  };

  const loginMutation = useMutation({
    mutationFn: (values: Partial<IEmailArgument>) => {
      return axiosClient.post("/auth/login", values);
    },

    onSuccess: (data) => {
      dispatch(login());
      setTokenInLocalStorage(data.data.access_token);
      showToast({
        type: "success",
        message: "Successfully logged in",
      });
      navigate(routes.dashboard);
    },

    onError: () => {
      showToast({
        type: "error",
        message: "Incorrect username or password",
      });
    },
  });

  const loginWithEmail = (values: Partial<IEmailArgument>) => {
    loginMutation.mutate(values);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const { access_token } = codeResponse;
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          responseMessage(res.data);
        })
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    onError: (error: any) => errorMessage(error),
  });

  const emailLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      loginWithEmail(values);
      setSubmitting(false);
    },
  });

  return (
    <Stack direction="row" height="100vh" position="relative">
      <AuthHeader page="login" />
      <Stack
        justifyContent="center"
        alignItems="center"
        width="45%"
        bgcolor={colors.black}
        position="relative"
        borderRadius="0 30px 30px 0"
        display={isMobile ? "none" : "flex"}
      >
        <Box mb="40px">
          <Typography
            mb="10px"
            textAlign="center"
            color={colors.white}
            fontSize="30px"
          >
            Login
          </Typography>
          <Typography color={colors.white} textAlign="center" fontSize="30px">
            and come on in
          </Typography>
        </Box>

        <img src={signupImg} width="350px" />
        <Typography position="absolute" bottom="20px" color={colors.white}>
          © Typeform
        </Typography>
      </Stack>
      <Stack
        justifyContent="center"
        width={isMobile ? "92%" : "55%"}
        margin="auto"
        height={isMobile ? "85vh" : "auto"}
        padding={isMobile ? "0 20px" : "0 150px"}
        boxSizing="border-box"
        borderRadius={isMobile ? "8px" : "0"}
        bgcolor={isMobile ? colors.secondaryColor : colors.white}
      >
        <Typography mb="30px" fontSize="24px" color={colors.black}>
          createForm
        </Typography>
        <Typography fontSize="20px" fontWeight={400} mx="auto">
          Get better data with conversational forms, surveys, quizzes & more.
        </Typography>
        <Box mt="35px">
          <Button
            variant="outlined"
            onClick={() => googleLogin()}
            sx={{
              border: "1px solid black",
              color: colors.black,
              width: "100%",
              p: "10px 10px",
              "&:hover": {
                color: colors.black,
                background: colors.hoverBlack,
                border: "1px solid black",
                transition: "0.3s all",
              },
            }}
          >
            <img
              src={GoogleIcon}
              style={{ width: "25px", marginRight: "20px" }}
            />
            <Typography>Sign in with Google</Typography>
          </Button>

          <SignUpORStyle>
            <span>OR</span>
          </SignUpORStyle>
          <Box sx={{ overflowY: "scroll" }}>
            <form onSubmit={emailLogin.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                variant="outlined"
                value={emailLogin.values.email}
                onChange={emailLogin.handleChange}
                onBlur={emailLogin.handleBlur}
                error={
                  emailLogin.touched.email && Boolean(emailLogin.errors.email)
                }
                helperText={emailLogin.touched.email && emailLogin.errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={emailLogin.values.password}
                onChange={emailLogin.handleChange}
                onBlur={emailLogin.handleBlur}
                error={
                  emailLogin.touched.password &&
                  Boolean(emailLogin.errors.password)
                }
                helperText={
                  emailLogin.touched.password && emailLogin.errors.password
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={emailLogin.isSubmitting}
                fullWidth
                sx={{
                  mt: 1,
                  width: "100%",
                  height: "45px",
                  borderRadius: "12px",
                }}
              >
                {emailLogin.isSubmitting
                  ? "Submitting..."
                  : "Sign in with Email"}
              </Button>
            </form>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
