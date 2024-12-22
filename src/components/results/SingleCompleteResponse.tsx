import React, { useState } from "react";
import { IForm } from "../../interfaces/IForm";
import { IResponseDetail } from "../../interfaces/IResponseDetail";
import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { colors } from "../../styles/colors";
import Icon from "../Icon";
import { Close } from "@mui/icons-material";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosTrash, IoMdPrint } from "react-icons/io";
import { formatDate } from "../../utils/functions";

const SingleCompleteResponse = ({
  form,
  response,
  setOpenResponseInFull,
  selectedResponse,
  selectResponse,
  totalResponses,
}: {
  form: IForm;
  response: IResponseDetail;
  setOpenResponseInFull: React.Dispatch<React.SetStateAction<boolean>>;
  selectResponse: (value: number) => void;
  selectedResponse: number;
  totalResponses: number;
}) => {
  const [tag, setTag] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box>
        <Stack direction="row" justifyContent="space-between" my="10px">
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <Stack
                display="row"
                justifyContent="center"
                alignItems="center"
                width="30px"
                padding="7px 0"
                direction="row"
                gap="8px"
                fontSize="14px"
                sx={{
                  backgroundColor:
                    selectedResponse - 1 !== -1
                      ? colors.borderTwo
                      : colors.buttonBorder,
                  borderRadius: "4px 0 0 4px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: colors.buttonBorder,
                  },
                }}
                onClick={() =>
                  selectedResponse - 1 !== -1 ? selectResponse(-1) : null
                }
              >
                <FaChevronLeft
                  color={
                    selectedResponse - 1 !== -1
                      ? colors.black
                      : colors.buttonBorder
                  }
                />
              </Stack>
              <Stack
                display="row"
                justifyContent="center"
                alignItems="center"
                width="30px"
                padding="7px 0"
                direction="row"
                gap="8px"
                fontSize="14px"
                sx={{
                  backgroundColor:
                    selectedResponse + 1 >= totalResponses
                      ? colors.borderTwo
                      : colors.buttonBorder,
                  borderRadius: "0px 4px 4px 0",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: colors.buttonBorder,
                  },
                }}
                onClick={() =>
                  selectedResponse + 2 <= totalResponses
                    ? selectResponse(1)
                    : null
                }
              >
                <FaChevronRight
                  color={
                    selectedResponse + 2 <= totalResponses
                      ? colors.black
                      : colors.borderTwo
                  }
                />
              </Stack>
              <Box ml="15px" fontSize="14px">
                {formatDate(response.createdAt)}
              </Box>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap="10px">
              <Box
                sx={{ display: "grid", placeItems: "center" }}
                width="30px"
                height="30px"
                borderRadius="4px"
                bgcolor={colors.iconColor}
                onClick={handleClick}
                position="relative"
              >
                <BiDotsHorizontal />{" "}
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
                      padding: "5px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
                    <IoMdPrint fontSize="20px" style={{ marginRight: "5px" }} />{" "}
                    Print this response
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    sx={{ fontSize: "14px", color: colors.danger }}
                    onClick={handleClose}
                  >
                    <IoIosTrash
                      fontSize="20px"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Delete this response
                  </MenuItem>
                </Menu>
              </Box>

              <Box
                sx={{ display: "grid", placeItems: "center" }}
                width="30px"
                height="30px"
                borderRadius="4px"
                bgcolor={colors.iconColor}
                onClick={() => setOpenResponseInFull(false)}
              >
                <Close sx={{ fontSize: "16px" }} />
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            backgroundColor: "rgb(247, 247, 246)",
            borderTop: `1px solid ${colors.buttonBorder}`,
            padding: "30px 15px",
          }}
        >
          <Stack direction="row" gap="10px" alignItems="center">
            <Icon iconName="Tag" fontSize="30px" withBg={true} />{" "}
            <Typography fontSize="14px">Tags</Typography>
          </Stack>
          <Box mt="20px">
            <input
              style={{
                width: "100%",
                height: "35px",
                padding: "0 5px",
                border: `1px solid ${colors.borderTwo}`,
                borderRadius: "4px",
              }}
              placeholder=""
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Box>

          <Box my="25px">
            {form.questions.map((question, index) => {
              return (
                <Box my="20px">
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Icon
                      iconName={question.questionType}
                      withBg={true}
                      fontSize="30px"
                    />
                    <Box>
                      <Typography fontSize="14px">
                        {question.questionText}
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color={colors.black}
                        mt="15px"
                      >
                        {response.answers[index]?.textResponse}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
            <Box my="20px">
              <Stack direction="row" gap="10px" alignItems="center">
                <Icon iconName="Hidden" withBg={true} fontSize="30px" />
                <Box>
                  <Typography fontSize="14px">Response ID</Typography>{" "}
                  <Typography fontSize="14px" color={colors.black} mt="15px">
                    {response._id}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SingleCompleteResponse;
