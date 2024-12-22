import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
