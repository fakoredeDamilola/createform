import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { colors } from "./colors";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Londrina Solid, sans-serif",
  },
  palette: {
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            color: colors.black,
            borderColor: colors.black,
            borderRadius: "6px",
            fontSize: "14px",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: colors.black,
              color: colors.white,
            },
          },
        },
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: colors.white,
            backgroundColor: colors.black,
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: colors.textButton,
              color: colors.white,
            },
          },
        },
        {
          props: { variant: "text", color: "info" },
          style: {
            color: colors.textButton,
            padding: "10px 15px",
            border: "none",
            outline: "none",
            "&:hover": {
              backgroundColor: colors.hoverBlack,
              color: colors.textButton,
            },
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.textButton,
        },
      },
      variants: [
        {
          props: { variant: "subtitle1", color: colors.black },
          style: {
            fontSize: "14px",
            color: colors.black,
          },
        },
      ],
    },
  },
});

export default theme;
