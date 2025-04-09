import { Box, Typography, useMediaQuery } from "@mui/material";
import { colors } from "../../styles/colors";
import ConfettiBackground from "./ConfettiBackground";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../utils/routes";
import theme from "../../styles/theme";

type StatusType = "success" | "error" | "idle" | "pending";

const LastContentPage = ({
  status,
  id,
}: {
  status: StatusType;
  id: string;
}) => {
  const { form } = useSelector((state: RootState) => state.content);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const getResponseRoute = (_id: string) => {
    const route = getRoute("resultPage", { responseId: _id });
    navigate(route);
  };
  return (
    <>
      <ConfettiBackground>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100vh"
        >
          {status === "success" ? (
            <>
              <Typography
                textAlign="center"
                variant={isMobile ? "h4" : "h2"}
                color={colors.mistBlue}
              >
                Congratulations, Response has been submitted
              </Typography>
              {form.formSettings.addAnswerToQuestion && (
                <Typography fontSize="18px" marginTop="20px">
                  Your result has been made available,{" "}
                  <span
                    onClick={() => getResponseRoute(id)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    View it here
                  </span>
                </Typography>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </Box>
      </ConfettiBackground>
    </>
  );
};

export default LastContentPage;
