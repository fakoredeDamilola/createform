import { Box, useMediaQuery } from "@mui/material";
import { colors } from "../styles/colors";
import theme from "../styles/theme";
import { routes } from "../utils/routes";

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = window.location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        px: isMobile ? "0" : "20px",
        py: "10px",
        boxSizing: "border-box",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor:
            pathname === routes.dashboard || pathname.includes("/form/result")
              ? "rgb(247, 247, 246)"
              : colors.white,
          border: "1px solid rgba(25, 25, 25, 0.01)",
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

export default ContainerLayout;
