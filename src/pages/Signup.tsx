import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import signinImg from "../assets/signin-img.svg";
import { colors } from "../styles/colors";
import GoogleIcon from "../assets/google.svg";
import { SignUpORStyle } from "../components/modals/styles";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GoogleLoginResponse } from "../interfaces/IGoogleResponse";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IEmailArgument } from "../interfaces/IEmailArgument";
import { useAxios } from "../AxiosClient";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import showToast from "../CustomToast";
import theme from "../styles/theme";
import AuthHeader from "../components/auth/AuthHeader";

const Signup = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const axiosClient = useAxios();

  const setTokenInLocalStorage = (accessToken: string) => {
    localStorage.setItem("token", accessToken);
  };

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

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name should be at least 2 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name should be at least 2 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  });

  const loginMutation = useMutation({
    mutationFn: (values: IEmailArgument) => {
      return axiosClient.post("/auth/register", values);
    },

    onSuccess: (data) => {
      setTokenInLocalStorage(data.data.access_token);
      showToast({
        type: "success",
        message: "This is a success",
      });
      navigate(routes.dashboard);
    },

    onError: () => {
      showToast({
        type: "error",
        message: "Email already exists",
      });
    },
  });

  const loginWithEmail = (values: IEmailArgument) => {
    loginMutation.mutate(values);
  };

  const emailSignup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px 30px",
          zIndex: 1000,
          height: "50px",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            position: "relative",
            zIndex: 500,
            display: isMobile ? "none" : "flex",
          }}
        >
          <h3>Createform</h3>
        </Box>

        <AuthHeader page="signup" />
      </Box>
      <Stack
        bgcolor={colors.secondaryColor}
        direction="row"
        borderRadius="12px"
        height="88vh"
        width="95%"
        margin="1vh auto"
        position="relative"
      >
        <Stack
          justifyContent="center"
          width={isMobile ? "92%" : "50%"}
          margin="auto"
          height={isMobile ? "85vh" : "auto"}
          padding={isMobile ? "0px 20px" : "0 150px"}
          boxSizing="border-box"
          borderRadius={isMobile ? "8px" : "0"}
          bgcolor={isMobile ? colors.secondaryColor : colors.secondaryColor}
        >
          <Typography
            mb="30px"
            fontSize="24px"
            textAlign="left"
            color={colors.black}
          >
            createForm
          </Typography>
          <Typography fontSize="20px" fontWeight={400} width="100%" mx="auto">
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
                p: "10px",
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
              <Typography>Sign up with Google</Typography>
            </Button>

            <SignUpORStyle>
              <span>OR</span>
            </SignUpORStyle>
            <form onSubmit={emailSignup.handleSubmit}>
              <Stack direction="row" gap="10px">
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={emailSignup.values.firstName}
                  onChange={emailSignup.handleChange}
                  onBlur={emailSignup.handleBlur}
                  error={
                    emailSignup.touched.firstName &&
                    Boolean(emailSignup.errors.firstName)
                  }
                  helperText={
                    emailSignup.touched.firstName &&
                    emailSignup.errors.firstName
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={emailSignup.values.lastName}
                  onChange={emailSignup.handleChange}
                  onBlur={emailSignup.handleBlur}
                  error={
                    emailSignup.touched.lastName &&
                    Boolean(emailSignup.errors.lastName)
                  }
                  helperText={
                    emailSignup.touched.lastName && emailSignup.errors.lastName
                  }
                />
              </Stack>

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                variant="outlined"
                value={emailSignup.values.email}
                onChange={emailSignup.handleChange}
                onBlur={emailSignup.handleBlur}
                error={
                  emailSignup.touched.email && Boolean(emailSignup.errors.email)
                }
                helperText={
                  emailSignup.touched.email && emailSignup.errors.email
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={emailSignup.values.password}
                onChange={emailSignup.handleChange}
                onBlur={emailSignup.handleBlur}
                error={
                  emailSignup.touched.password &&
                  Boolean(emailSignup.errors.password)
                }
                helperText={
                  emailSignup.touched.password && emailSignup.errors.password
                }
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  border: "none",
                  backgroundColor: colors.black,
                  color: colors.white,
                  width: "100%",
                  height: "45px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
                disabled={emailSignup.isSubmitting}
              >
                {emailSignup.isSubmitting
                  ? "Submitting..."
                  : "Sign up with Email"}
              </Button>
            </form>
          </Box>
        </Stack>

        <Stack
          width="50%"
          position="relative"
          display={isMobile ? "none" : "block"}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            height="80%"
            margin="10% 0"
            borderRadius="150px 0 0 150px"
            bgcolor={colors.signupColor}
          >
            <img src={signinImg} width="450px" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Signup;
