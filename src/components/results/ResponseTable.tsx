import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { QuestionType } from "../../utils/constants";
import Icon from "../Icon";
import { FaRegClock } from "react-icons/fa";
import { IForm } from "../../interfaces/IForm";
import { IResponseDetail } from "../../interfaces/IResponseDetail";
import { colors } from "../../styles/colors";
import { formatDateForTable } from "../../utils/functions";
import TableDropdown from "./TableDropdown";
import { MdOpenInFull } from "react-icons/md";

const ResponseTable = ({
  numSelected,
  rowCount,
  form,
  selected,
  setSelected,
  responses,
  onSelectAllClick,
  openResponseInFull,
}: {
  numSelected: number;
  rowCount: number;
  form: IForm;
  selected: readonly string[];
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
  responses: IResponseDetail[];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openResponseInFull: (_id: string) => void;
}) => {
  const [showOpen, setShowOpen] = useState(-1);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <Table sx={{ overflowX: "scroll", backgroundColor: "rgb(247, 247, 246)" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: colors.white }}>
          <TableCell
            align="right"
            sx={{
              backgroundColor: colors.white,
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",

              position: "sticky",
              left: 0,
              zIndex: 2,
            }}
          >
            <Stack direction="row" gap="10px">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
              <FaRegClock fontSize="25px" />
              <Typography fontSize="12px" mt="3px">
                Date
              </Typography>
            </Stack>
          </TableCell>
          <TableCell
            sx={{
              fontSize: "12px",
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            Response Type
          </TableCell>
          {form.questions.map((question) => (
            <TableCell
              align="left"
              sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              <Stack direction="row" justifyContent="space-between" mt="5px">
                <Stack direction="row" gap="10px">
                  <Icon
                    iconName={question.questionType}
                    withBg={true}
                    fontSize="25px"
                  />
                  <Typography fontSize="12px" mt="3px">
                    {question.questionText[0]}
                  </Typography>
                </Stack>
                <TableDropdown />
              </Stack>
            </TableCell>
          ))}

          <TableCell
            align="right"
            sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Stack direction="row" gap="10px" mt="5px">
              <Icon iconName="Tag" withBg={true} fontSize="25px" />
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize="12px" mt="3px">
                  Tags
                </Typography>{" "}
                <TableDropdown />
              </Stack>
            </Stack>
          </TableCell>

          <TableCell
            align="right"
            sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Icon iconName="Hidden" withBg={true} fontSize="25px" />
              <Typography fontSize="12px" mt="5px">
                Response ID
              </Typography>
              <TableDropdown />
            </Stack>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {responses.map((response, index) => {
          const isItemSelected = selected.includes(response._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          const formatDate = formatDateForTable(response.submissionDate);
          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, response._id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={response._id}
              selected={isItemSelected}
              sx={{ cursor: "pointer" }}
            >
              <TableCell
                scope="row"
                sx={{
                  backgroundColor: colors.white,
                  borderRight: "1px solid rgba(0, 0, 0, 0.12)",

                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                }}
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setShowOpen(index);
                }}
                onMouseOut={(e) => {
                  e.preventDefault();
                  setShowOpen(-1);
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                  <Box>
                    <Typography fontSize="12px" color={colors.black}>
                      {formatDate.date}
                    </Typography>
                    <Typography fontSize="12px" mt="10px">
                      {formatDate.time}
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => openResponseInFull(response._id)}
                    visibility={showOpen === index ? "visible" : "hidden"}
                  >
                    <MdOpenInFull
                      fontSize="20px"
                      style={{ marginTop: "15px" }}
                    />
                  </Box>
                </Stack>
              </TableCell>
              <TableCell
                scope="row"
                sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderRadius: "4px",
                    border: `1px solid ${colors.tagBorderColor}`,
                    backgroundColor: colors.tagColor,
                  }}
                  p="3px"
                >
                  Completed
                </Stack>
              </TableCell>
              {response.answers.map((answer, key) => {
                const optionText =
                  answer.questionType === QuestionType.multiple_choice &&
                  form.questions[key]?.options?.find(
                    (option) => option.optionId === answer.optionId
                  )?.optionText;
                return (
                  <TableCell
                    align="left"
                    key={key}
                    sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    {answer.questionType === QuestionType.long_text ||
                    answer.questionType === QuestionType.short_text
                      ? answer.textResponse
                      : answer.questionType === QuestionType.multiple_choice
                      ? optionText
                      : null}
                  </TableCell>
                );
              })}

              <TableCell
                align="left"
                sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                Tag
              </TableCell>
              <TableCell
                align="left"
                sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                {response._id}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ResponseTable;
