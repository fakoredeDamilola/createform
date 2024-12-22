import { Stack, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const RouteTab = ({
  formName,
  setDebouncedFormName,
}: {
  formName?: string;
  setDebouncedFormName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap="5px"
    >
      <GridViewIcon sx={{ fonSize: "8px" }} />
      <Typography
        fontWeight="500"
        fontSize="10px"
        sx={{
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => navigate(routes.dashboard)}
      >
        My workspace
      </Typography>
      <ChevronRightIcon />

      <input
        style={{
          width: "100px",
          height: "30px",
          fontSize: "14px",
          border: "none",
        }}
        value={formName}
        onChange={(e) => setDebouncedFormName(e.target.value)}
      />
    </Stack>
  );
};

export default RouteTab;
