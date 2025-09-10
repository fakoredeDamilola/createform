import { IForm } from "../../interfaces/IForm";
import { Box, Stack, Typography } from "@mui/material";
import { colors } from "../../styles/colors";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineOutbox } from "react-icons/md";
import { DashboardViewEnum } from "../../utils/enums";

const FormTab = ({
  form,
  getFormAndOpen,
  dashboardView,
}: {
  form: IForm;
  getFormAndOpen: () => void;
  dashboardView: DashboardViewEnum;
}) => {
  const gridView = dashboardView === DashboardViewEnum.GRID
  return (
   <>
   {
    gridView ? (
      <Stack
      border={`2px solid ${colors.borderTwo}`}
      padding="10px"

      bgcolor={colors.white}
      sx={{
        cursor: "pointer",
        transition: "0.3s all",
        "&:hover": {
          border: `2px solid ${colors.buttonBorder}`,
        },
      }}
      borderRadius="8px"
      
      width="300px"
      onClick={getFormAndOpen}
      direction={gridView?"column":"row"}
      justifyContent="space-between"
    >
      <Box sx={{width:"100%", height:"160px", bgcolor:colors.softMint, borderRadius:"8px"}} />
      
      
      <Stack direction="row" alignItems="center" gap="5px" mt="10px" justifyContent="space-between">
        <Stack direction="row" justifyContent="space-between"  alignItems="center" gap="5px">

        <Box
          sx={{
            width: "35px",
            height: "35px",
            backgroundColor: colors.coolGray,
            borderRadius: "8px",
          }}
        />
        <Box>
          <Typography>{form.formName}</Typography>
        <Typography fontSize="13px" textAlign="center">
        Total responses: {form.responses ? form.responses.length : "-"}
        </Typography>
        </Box>
        </Stack>
        <Box textAlign="right">
          <BsThreeDots />
        </Box>
      </Stack>

    </Stack>
    ) : (
      <Stack
      border={`2px solid ${colors.borderTwo}`}
      padding="10px"
      bgcolor={colors.white}
      sx={{
        cursor: "pointer",
        transition: "0.3s all",
        "&:hover": {
          border: `2px solid ${colors.buttonBorder}`,
        },
      }}
      borderRadius="8px"
      width="100%"
      onClick={getFormAndOpen}
      direction="row"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" gap="5px">
        <Box
          sx={{
            width: "35px",
            height: "35px",
            backgroundColor: colors.coolGray,
            borderRadius: "8px",
          }}
        />
        <Typography>{form.formName}</Typography>
      </Stack>

      <Stack direction="row" gap="20px" alignItems="center">
        <Typography fontSize="13px" minWidth="100px" textAlign="center">
          {form.responses ? form.responses.length : "-"}
        </Typography>
        <Typography fontSize="13px" minWidth="120px" textAlign="center">
          -
        </Typography>
        <Typography fontSize="13px" minWidth="100px" textAlign="center">
          -
        </Typography>
        <Box minWidth="100px" textAlign="center">
          <MdOutlineOutbox fontSize="24px" />
        </Box>
        <Box minWidth="100px" textAlign="right">
          <BsThreeDots />
        </Box>
      </Stack>
    </Stack>
    )
   }
   </>
  );
};

export default FormTab;
