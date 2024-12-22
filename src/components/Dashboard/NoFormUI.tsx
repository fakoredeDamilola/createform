import { Box, Button, Stack, Typography } from "@mui/material";
import noformpng from "../../assets/no-form.png";
import { Add } from "@mui/icons-material";

const NoFormUI = ({ openCreateForm }: { openCreateForm: () => void }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box>
        <img src={noformpng} width="200px" alt="No Form" />
      </Box>
      <Typography fontSize="20px" my="20px">
        There is not a form in sight
      </Typography>
      <Button variant="contained" onClick={openCreateForm}>
        <Add /> Create a new form
      </Button>
    </Stack>
  );
};

export default NoFormUI;
