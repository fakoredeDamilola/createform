import { Stack, Typography, useMediaQuery } from "@mui/material";
import { colors } from "../../styles/colors";
import zapier from "../../assets/zapier-logo.svg";
import slack from "../../assets/slack-logo.svg";
import analytics from "../../assets/analytics-logo.svg";
import hubspot from "../../assets/hubspot-logo-tool.svg";
import theme from "../../styles/theme";

const Integrations = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      id="integrations"
      flexDirection={isMobile ? "column" : "row"}
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Typography color={colors.black} fontSize="24px">
        Works with all your tools
      </Typography>
      <Stack
        flexDirection="row"
        gap="25px"
        px={isMobile ? "15px" : "0"}
        mt={isMobile ? "30px" : "0"}
        sx={{
          overflowY: "scroll",
          width: isMobile ? "100%" : "auto",
        }}
      >
        {[zapier, analytics, hubspot, slack].map((imgUrl, index) => (
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            key={index}
            bgcolor={colors.secondaryColor}
            width="200px"
            height="200px"
            borderRadius="40px"
            sx={{ flexShrink: 0 }}
          >
            <img src={imgUrl} width="100px" />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Integrations;
