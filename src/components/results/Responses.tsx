import { Box, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import ResponseTab from "./ResponseTab";
import ResponseTable from "./ResponseTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SingleCompleteResponse from "./SingleCompleteResponse";
import { colors } from "../../styles/colors";

const Responses = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const { form, responses } = useSelector((state: RootState) => state.form);

  const [openResponseInFull, setOpenResponseInFull] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState("");

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = responses.map((n) => n._id);
      console.log({ newSelected });
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const openResInFull = (_id: string) => {
    setOpenResponseInFull(true);
    setSelectedResponse(_id);
  };

  const selectResponse = (value: number) => {
    const currentResponseIndex = responses.findIndex(
      (res) => res._id === selectedResponse
    );
    setSelectedResponse(responses[currentResponseIndex + value]._id);
  };

  return (
    <Box>
      <ResponseTab search={search} setSearch={setSearch} />
      <Stack direction="row" gap="20px">
        <Box
          my="20px"
          width={openResponseInFull ? "65%" : "100%"}
          sx={{
            overflowX: "scroll",
            padding: openResponseInFull ? "24px 8px 24px 0" : "24px",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 2px 4px",
            height: "100%",
            borderRadius: "8px",
            backgroundColor: colors.white,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgb(247, 247, 246)",
            }}
          >
            <ResponseTable
              onSelectAllClick={handleSelectAllClick}
              form={form}
              responses={responses}
              rowCount={responses.length}
              numSelected={selected.length}
              selected={selected}
              setSelected={setSelected}
              openResponseInFull={openResInFull}
            />
          </Box>
        </Box>

        {openResponseInFull && (
          <>
            <Box mx="10px">
              <Divider orientation="vertical" />
            </Box>

            <Stack
              width="35%"
              sx={{
                overflowX: "scroll",
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 2px 4px",
                height: "100%",
                borderRadius: "8px",
                backgroundColor: colors.white,
                boxSizing: "border-box",
                p: "20px",
              }}
            >
              {selectedResponse && (
                <SingleCompleteResponse
                  form={form}
                  totalResponses={responses.length}
                  response={
                    responses.find(
                      (response) => response._id === selectedResponse
                    ) ?? responses[0]
                  }
                  setOpenResponseInFull={setOpenResponseInFull}
                  selectedResponse={responses.findIndex(
                    (res) => res._id === selectedResponse
                  )}
                  selectResponse={selectResponse}
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Responses;
