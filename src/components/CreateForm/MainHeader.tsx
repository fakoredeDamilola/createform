import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FaDesktop } from "react-icons/fa";
import { CiMobile2, CiPlay1 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RxAccessibility } from "react-icons/rx";
import { AiOutlineTranslation } from "react-icons/ai";
import { colors } from "../../styles/colors";
import { DeviceOrientation } from "../../utils/constants";

interface IProps {
  deviceOrientation: DeviceOrientation;
  changeDeviceOrientation: () => void;
  setOpenCreateFormElementModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFormSettingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const iconStyle = {
  marginTop: "10px",
  color: colors.textButton,
  fontSize: "20px",
};

const MainHeader = ({
  deviceOrientation,
  changeDeviceOrientation,
  setOpenFormSettingModal,
  setOpenCreateFormElementModal,
}: IProps) => {
  return (
    <Stack
      direction="row"
      gap="15px"
      sx={{
        backgroundColor: colors.secondaryColor,
        borderRadius: "12px",
        padding: "8px",
        width: "100%",
      }}
    >
      <Button
        sx={{
          height: "35px",
          backgroundColor: colors.white,
          borderRadius: "12px",
          width: "130px",
          border: `1px solid ${colors.buttonBorder}`,
          color: colors.textButton,
        }}
        onClick={() => setOpenCreateFormElementModal(true)}
      >
        <Add /> <Typography fontSize="12px">Add content</Typography>
      </Button>
      <Divider
        sx={{ height: "25px", marginTop: "6px" }}
        orientation="vertical"
      />
      <Box sx={{ cursor: "pointer" }}>
        {deviceOrientation === DeviceOrientation.desktop ? (
          <FaDesktop style={iconStyle} onClick={changeDeviceOrientation} />
        ) : (
          <CiMobile2 style={iconStyle} onClick={changeDeviceOrientation} />
        )}
      </Box>
      <CiPlay1 style={iconStyle} />
      <Divider
        sx={{ height: "25px", marginTop: "6px" }}
        orientation="vertical"
      />
      <RxAccessibility style={iconStyle} />
      <AiOutlineTranslation style={iconStyle} />
      <IoSettingsOutline
        style={iconStyle}
        onClick={() => setOpenFormSettingModal(true)}
      />
    </Stack>
  );
};

export default MainHeader;
