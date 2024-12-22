import { useState } from "react";
import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProfilePicture from "../ProfilePicture";
import { colors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const UserTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user: userState } = useSelector((state: RootState) => state);
  const user = userState.user;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate(routes.home);
  };

  if (user) {
    return (
      <>
        <Stack
          direction="row"
          gap="3px"
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <Box onClick={handleClick}>
            <ProfilePicture user={user} />
          </Box>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            mt: 1,
            "& .MuiPaper-root": {
              position: "absolute",
              top: "50px !important",
              left: "0",
              minWidth: 250,
              borderRadius: "8px",
              padding: "10px 10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Box>
            <ProfilePicture user={user} showDetails={true} />
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Organization
            </Typography>
          </Box>
          <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
            Admin Settings
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
            org Members
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Your organizations
            </Typography>
          </Box>
          <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
            Notifications
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
            Data
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            sx={{ fontSize: "14px", color: colors.danger }}
            onClick={logoutUser}
          >
            Log out
          </MenuItem>
        </Menu>
      </>
    );
  } else {
    return null;
  }
};

export default UserTab;
