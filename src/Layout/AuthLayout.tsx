import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { routes } from "../utils/routes";
import { Outlet, useNavigate } from "react-router-dom";
import showToast from "../CustomToast";

const AuthLayout = () => {
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
    return (
      <Box>
        {" "}
        <Outlet />{" "}
      </Box>
    );
  } else {
    return <Box>You are not authenticated </Box>;
  }
};

export default AuthLayout;
