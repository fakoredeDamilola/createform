import { useState } from "react";
import { Box, Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../styles/theme";
import { HeaderLinkStyles, HeaderListContainer } from "./styles";
import { colors } from "../styles/colors";
import { headerLinks } from "../utils/constants";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(routes.home);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openModal = (modal: string) => {
    if (modal === "login") {
      navigate(routes.login);
    } else {
      navigate(routes.signup);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: colors.white,
        padding: isMobile ? "10px 20px" : "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 500,
        }}
      >
        <h3>Createform</h3>
      </Box>

      <HeaderListContainer mobile={isMobile} mobileOpen={mobileOpen}>
        {headerLinks.map((link) => (
          <HeaderLinkStyles
            mobile={isMobile}
            to={`/${link.route}`}
            key={link.route}
            selected={selectedLink === link.route}
            onClick={() => setSelectedLink(link.route)}
          >
            {link.title}
            <div />
          </HeaderLinkStyles>
        ))}
        <Stack
          direction="row"
          gap="30px"
          sx={{
            display: isMobile ? "flex" : "none",
            position: "absolute",
            bottom: "20px",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              height: "50px",
              borderRadius: "8px",
            }}
            onClick={() => openModal("login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "120px",
              height: "50px",
              borderRadius: "8px",
            }}
            onClick={() => openModal("signup")}
          >
            Sign up
          </Button>
        </Stack>
      </HeaderListContainer>

      <Stack
        direction="row"
        gap="30px"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "120px",
            height: "50px",
            borderRadius: "8px",
          }}
          onClick={() => openModal("login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "120px",
            height: "50px",
            borderRadius: "8px",
            marginLeft: "20px",
          }}
          onClick={() => openModal("signup")}
        >
          Sign up
        </Button>
      </Stack>

      <IconButton
        color="inherit"
        edge="end"
        onClick={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" }, zIndex: "20" }}
      >
        {mobileOpen ? (
          <CloseIcon
            sx={{ color: colors.black, fontSize: "40px", cursor: "pointer" }}
          />
        ) : (
          <MenuIcon
            sx={{ color: colors.black, fontSize: "40px", cursor: "pointer" }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default Header;
