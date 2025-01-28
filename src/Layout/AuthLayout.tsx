import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import showToast from "../CustomToast";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    else {
      showToast({
        type: "error",
        message: "You are not authenticated",
      });
      setTimeout(() => {
        navigate(routes.home);
      }, 3000);
    }
  }, []);

  if (authToken) {
    return <Box>{children}</Box>;
  } else {
    <Box>You are not authenticated </Box>;
  }
};

export default AuthLayout;
