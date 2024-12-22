import { Stack, useMediaQuery } from "@mui/material";
import FeatureCard from "./FeatureCard";
import { IFeature } from "../../interfaces/IFeature";
import theme from "../../styles/theme";
import designedToAttract from "../../assets/designed-to-attract.webp";
import uniqueData from "../../assets/unique-data.webp";
import deeperInsights from "../../assets/deeper-insights.webp";

const Features = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const featureCards: IFeature[] = [
    {
      title: "Designed to attract",
      description:
        "Your forms will look anything but ordinary. Customize the entire design, embed it in all the right places, and strike a chord with engaging video content.",
      img: designedToAttract,
    },
    {
      title: "Gathers deeper insights",
      description:
        "More data is just a follow-up question away. Encourage customers to elaborate by asking questions based on their previous answers.",
      img: deeperInsights,
    },
    {
      title: "Prioritizes unique data",
      description:
        "Some data is harder to come by. Collect readily-available data without having to ask so your customers can focus on sharing everything else.",
      img: uniqueData,
    },
  ];
  return (
    <Stack
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      gap="30px"
    >
      {featureCards.map((feature) => (
        <FeatureCard feature={feature} />
      ))}
    </Stack>
  );
};

export default Features;
