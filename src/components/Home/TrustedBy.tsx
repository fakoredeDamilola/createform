import Airbnb from "../../assets/airbnb-logo.svg";
import BarrysLogo from "../../assets/barrys-logo.svg";
import HubspotLogo from "../../assets/hubspot-logo.svg";
import Mailchimp from "../../assets/mailchimp-logo.svg";
import Hermes from "../../assets/hermes-logo.svg";
import { Box, Stack, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const TrustedBy = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      flexDirection="row"
      flexWrap={isMobile ? "wrap" : "nowrap"}
      justifyContent="space-between"
      alignItems="center"
      width={isMobile ? "90%" : "80%"}
      gap={isMobile ? "40px" : "0"}
      margin="auto"
    >
      {[Airbnb, BarrysLogo, HubspotLogo, Mailchimp, Hermes].map(
        (item, index) => (
          <Box key={index}>
            <img src={item} style={{ width: "150px" }} />
          </Box>
        )
      )}
    </Stack>
  );
};

export default TrustedBy;
