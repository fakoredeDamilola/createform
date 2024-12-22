import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import { colors } from "../../styles/colors";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";

const AuthHeader = ({ page }: { page: string }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction="row"
      gap="10px"
      position="absolute"
      top="10px"
      width={isMobile ? "100%" : "auto"}
      padding={isMobile ? "0 12px" : "0"}
      justifyContent={isMobile ? "space-between" : "auto"}
      right={isMobile ? "0%" : "20px"}
      alignItems="center"
    >
      <Typography
        fontSize="16px"
        color={colors.black}
        display={isMobile ? "block" : "none"}
      >
        createForm
      </Typography>
      <Typography fontSize="13px" display={isMobile ? "none" : "block"}>
        Create a new Account?
      </Typography>
      <Button
        sx={{
          width: "70px",
          height: "25px",
          borderRadius: "8px",
          border: "0.5px solid black",
          color: "black",
          fontSize: "10px",
          cursor: "pointer",
        }}
        variant="outlined"
        onClick={() =>
          navigate(page === "login" ? routes.signup : routes.login)
        }
      >
        {page === "login" ? "Sign up" : "Login"}
      </Button>
    </Stack>
  );
};

export default AuthHeader;
