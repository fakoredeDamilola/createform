import { Typography, Box, useMediaQuery } from "@mui/material";
import { IFeature } from "../../interfaces/IFeature";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

const FeatureCard = ({ feature }: { feature: IFeature }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { title, description, img } = feature;

  return (
    <Box
      sx={{
        height: "auto",
        margin: "auto",
        width: isMobile ? "90%" : "100%",
      }}
    >
      <Box height={isMobile ? "100%" : "430px"}>
        <img src={img} width="100%" height="100%" />
      </Box>

      <Box mt="30px" />
      <Typography
        color={colors.black}
        fontWeight="600"
        fontSize="22px"
        margin="10px 0"
      >
        {title}
      </Typography>
      <Typography variant="body2" color={colors.black} fontSize="16px">
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
