import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { updateTimeLeft } from "../../store/slices/content.slice";
import { useDispatch } from "react-redux";
import { formatTime } from "../../utils/functions";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  answerId?: string;
}

const ContentTimer: React.FC<TimerProps> = ({
  duration,
  onTimeUp,
  answerId,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          onTimeUp();
        }
        dispatch(
          updateTimeLeft({
            timeLeft: prevTime > 0 ? prevTime - 1 : 0,
            answerId,
          })
        );

        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const getStyles = () => {
    if (timeLeft <= 5) {
      return {
        color: "red",
        fontSize: { xs: "22px", sm: "26px" },
        animation: "pulse 1s infinite",
      };
    } else if (timeLeft === 0) {
      return {
        color: "red",
      };
    }
    return {
      color: "primary.main",
      fontSize: { xs: "18px", sm: "22px" },
    };
  };

  return (
    <Box
      position="fixed"
      right="15px"
      top="30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
      padding="5px"
      borderRadius="8px"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Typography
        fontWeight="bold"
        sx={{
          ...getStyles(),
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.2)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default ContentTimer;
