// src/CustomToast.ts
import toast, { ToastOptions } from "react-hot-toast";
import { Typography, Box, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "./styles/colors";
import { useEffect, useState } from "react";

interface CustomToastProps {
  type: "success" | "error" | "warning";
  message: string;
}

const getToastStyles = (type: CustomToastProps["type"]) => {
  switch (type) {
    case "success":
      return { color: "#4caf50" }; // Green for success
    case "error":
      return { color: "#f44336" }; // Red for error
    case "warning":
      return { color: "#ff9800" }; // Orange for warning
    default:
      return { color: "#1976d2" };
  }
};

const showToast = ({ type, message }: CustomToastProps) => {
  toast(
    (t) => {
      const [progress, setProgress] = useState(100);

      useEffect(() => {
        const interval = setInterval(() => {
          setProgress((prev) => (prev > 0 ? prev - 1 : 0));
        }, 40); // 4000ms / 100 = 40ms per 1% decrement

        if (progress === 0) {
          toast.dismiss(t.id);
        }

        return () => clearInterval(interval);
      }, [progress, t.id]);

      return (
        <div
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            width: "13rem",

            background: colors.white,
            borderRadius: "8px",
            transition: "all 0.2s",
            opacity: t.visible ? 1 : 0,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ padding: "10px", paddingBottom: "0" }}>
            <Box sx={{ flexGrow: 1, color: colors.black }}>
              <Typography variant="body2">{message}</Typography>
            </Box>

            <IconButton
              size="small"
              onClick={() => toast.dismiss(t.id)}
              style={{
                marginLeft: "auto",
                color: getToastStyles(type).color,
                position: "absolute",
                top: "4px",
                right: "5px",
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: "14px",
                  color: getToastStyles(type).color,
                }}
              />
            </IconButton>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              marginTop: "10px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: getToastStyles(type).color,
            }}
          />
        </div>
      );
    },
    { duration: 4000, position: "top-left" } as ToastOptions
  );
};

export default showToast;
