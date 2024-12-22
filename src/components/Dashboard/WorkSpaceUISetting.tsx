import {
  Box,
  Button,
  Divider,
  Menu,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { BsPencil, BsSortAlphaDown, BsThreeDots } from "react-icons/bs";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { colors } from "../../styles/colors";
import MenuItem from "@mui/material/MenuItem";
import {
  WindowOutlined,
  FormatListBulleted,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import { SlCalender } from "react-icons/sl";
import { CgMenuGridR } from "react-icons/cg";
import theme from "../../styles/theme";

const buttonStyle = {
  color: colors.textButton,
  padding: "10px 15px",
  border: "none",
  outline: "none",
  "&:hover": {
    backgroundColor: colors.hoverBlack,
    color: colors.textButton,
  },
};

const dashBoardViews = [
  {
    name: "Grid",
    icon: <WindowOutlined sx={{ fontSize: "18px" }} />,
  },
  {
    name: "List",
    icon: <FormatListBulleted sx={{ fontSize: "18px" }} />,
  },
];

const WorkSpaceUISetting = ({
  setOpenSideDashboard,
  openSideDashboard,
}: {
  setOpenSideDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  openSideDashboard: boolean;
}) => {
  const dropDownItems = [
    { icon: <SlCalender />, text: "Date Created" },
    { icon: <BsPencil />, text: "Last Updated" },
    { icon: <BsSortAlphaDown />, text: "Alphabetical" },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedDropdown, setSelectedDropdown] = useState(dropDownItems[0]);
  const [selectedView, setSelectedView] = useState(dashBoardViews[0].name);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index: number) => {
    const item = dropDownItems.find((item, id) => id === index);
    console.log({ item });
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        mt={isMobile ? "0" : "10px"}
        p="5px 8px"
        direction="row"
        justifyContent="space-between"
        sx={{ backgroundColor: isMobile ? colors.white : "transparent" }}
      >
        <Stack
          display={isMobile ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
          onClick={() => setOpenSideDashboard(!openSideDashboard)}
        >
          <CgMenuGridR fontSize="22px" />
        </Stack>
        <Stack direction="row" gap="5px" alignItems="center">
          <Typography fontSize={isMobile ? "18px" : "24px"} fontWeight="400">
            My Workspace
          </Typography>
          <Button sx={buttonStyle}>
            <BsThreeDots style={{ fontSize: "18px" }} />
          </Button>
          <Button sx={buttonStyle}>
            <MdOutlinePersonAddAlt1 style={{ fontSize: "18px" }} />{" "}
            <Typography
              ml="10px"
              fontSize="14px"
              display={isMobile ? "none" : "block"}
            >
              Invite
            </Typography>
          </Button>
        </Stack>
        <Stack direction="row" gap="20px" display={isMobile ? "none" : "flex"}>
          <Box>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDown />}
              sx={{
                backgroundColor: colors.white,
                color: colors.black,
                border: `1px solid ${colors.borderTwo}`,
                borderRadius: "10px",
                fontSize: "12px",
                padding: "7px 15px",
                transition: "0.3s all",
                "&:hover": {
                  backgroundColor: colors.borderTwo,
                  color: colors.black,
                },
              }}
            >
              {selectedDropdown.icon}
              <Typography ml="10px" fontSize="12px">
                {selectedDropdown.text}
              </Typography>
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {dropDownItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setSelectedDropdown(item);
                    handleClose(index);
                  }}
                  disableRipple
                >
                  {item.icon}
                  <Typography ml="10px">{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box>
            <Stack direction="row">
              {dashBoardViews.map((value, index) => (
                <Stack
                  key={index}
                  display="row"
                  justifyContent="center"
                  alignItems="center"
                  width="80px"
                  padding="7px 0"
                  direction="row"
                  gap="8px"
                  fontSize="14px"
                  sx={{
                    backgroundColor:
                      value.name.toLowerCase() === selectedView.toLowerCase()
                        ? colors.borderTwo
                        : colors.white,
                    borderRadius: index === 1 ? "0px 8px 8px 0" : "8px 0 0 8px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: colors.borderTwo,
                    },
                  }}
                  onClick={() => {
                    setSelectedView(value.name);
                  }}
                >
                  {value.icon} {value.name}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Stack
          display={isMobile ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
          borderLeft={`1px solid ${colors.borderTwo}`}
        >
          <Search sx={{ marginLeft: "10px" }} />
        </Stack>
      </Stack>
      <Divider
        sx={{
          mt: "20px",
          border: `2px solid ${colors.borderTwo}`,
          display: isMobile ? "none" : "block",
        }}
      />
    </>
  );
};

export default WorkSpaceUISetting;
