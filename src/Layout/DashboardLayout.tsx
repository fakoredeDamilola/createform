import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { colors } from "../styles/colors";
import { useDispatch } from "react-redux";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { routes } from "../utils/routes";
import { AxiosError } from "axios";
import { setUserInfo } from "../store/slices/user.slice";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (isError) {
      console.log({ error });
      if ((error as AxiosError)?.status === 401) {
        navigate(routes.home);
      }
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>is loading</div>;
  if (error) return <div>Error fetching data</div>;
  return (
    <Box
      sx={{
        px: isMobile || pathname.includes("/form/result") ? "0" : "20px",
        py: "10px",
        boxSizing: "border-box",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          px: isMobile
            ? "5px"
            : pathname.includes("/form/result")
            ? "20px"
            : "0px",
          pb: "5px",
        }}
        borderBottom={`1px solid ${colors.borderTwo}`}
      >
        <DashboardHeader />
      </Box>

      <Box
        sx={{
          backgroundColor:
            pathname === routes.dashboard ? "rgb(247, 247, 246)" : colors.white,
          border: pathname.includes("/form/result")
            ? "none"
            : "1px solid rgba(25, 25, 25, 0.01)",
          borderRadius:
            isMobile || pathname !== routes.dashboard ? "0" : "12px",
          my: isMobile ? "0px" : "15px",
          flex: 1,
          p: 0,
          height: "calc(100% - 70px)",
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
