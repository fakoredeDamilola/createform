import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { LogoLineStyles, ProfileImageStyle } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";

const ProfileTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useSelector((state: RootState) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user) {
    return (
      <>
        <Stack
          direction="row"
          gap="3px"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <LogoLineStyles />

          {user?.profilePicture ? (
            <img src={user.profilePicture} />
          ) : (
            <ProfileImageStyle />
          )}
          <Typography fontSize="14px">{user.email.split("@")[0]}</Typography>
          <KeyboardArrowDown />
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
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  } else {
    return null;
  }
};

export default ProfileTab;
