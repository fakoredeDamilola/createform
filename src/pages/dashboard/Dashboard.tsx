import { useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Add, Close, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import WorkSpaceUISetting from "../../components/Dashboard/WorkSpaceUISetting";
import NoFormUI from "../../components/Dashboard/NoFormUI";
import theme from "../../styles/theme";
import DashboardLayout from "../../Layout/DashboardLayout";
import { getRoute } from "../../utils/routes";
import { DashboardTabs, formTabHeaders } from "../../utils/constants";
import { colors } from "../../styles/colors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewFormApi, getUserForms } from "../../api/dashboard.api";
import FormTab from "../../components/Dashboard/FormTab";
import { IForm } from "../../interfaces/IForm";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const [openSideDashboard, setOpenSideDashboard] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["getUserForms"],
    queryFn: getUserForms,
  });

  const { mutate } = useMutation({
    mutationFn: createNewFormApi,
    onSuccess: (data) => {
      const route = getRoute("createForm", { formId: data._id });
      navigate(route);
    },
    onError: (error) => {
      console.error("Error creating item:", error);
    },
  });

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const openCreateForm = () => {
    mutate({ formName: "Create new Form" });
  };

  const getFormAndOpen = (_id: string) => {
    const route = getRoute("createForm", { formId: _id });
    navigate(route);
  };

  return (
    <DashboardLayout>
      <Stack
        direction="row"
        gap="20px"
        px="30px"
        height="50px"
        borderBottom={`2px solid ${colors.white}`}
        display={isMobile ? "none" : "flex"}
      >
        {DashboardTabs.map((tab: string) => (
          <Typography py="12px" borderBottom={`2px solid ${colors.black}`}>
            {tab}
          </Typography>
        ))}
      </Stack>
      <Stack direction="row" height="calc(100% - 50px)">
        <Box
          maxWidth="260px"
          width="260px"
          borderRight={`1px solid ${colors.white}`}
          position={isMobile ? "absolute" : "relative"}
          sx={{ flex: 1, transition: "0.3s all" }}
          height="100%"
          zIndex="10"
          bgcolor={isMobile ? colors.white : "transparent"}
          left={isMobile && !openSideDashboard ? "-100%" : "0"}
        >
          <Close
            sx={{
              position: "absolute",
              display: isMobile ? "block" : "none",
              right: "5px",
              top: "8px",
              cursor: "pointer",
            }}
            onClick={() => setOpenSideDashboard(false)}
          />
          <Box
            px="30px"
            py={isMobile ? "30px" : "22px"}
            borderBottom={`2px solid ${colors.white}`}
          >
            <Button
              variant="contained"
              sx={{ height: "35px", width: "100%" }}
              onClick={openCreateForm}
            >
              <Add /> Create a new form
            </Button>
          </Box>
          <Box
            px="30px"
            py="16px"
            width="100%"
            boxSizing="border-box"
            borderBottom={`2px solid ${colors.white}`}
          >
            <Stack
              direction="row"
              gap="10px"
              width="100%"
              bgcolor="transparent"
              boxSizing="border-box"
              p="7px"
              borderRadius="10px"
              sx={{
                cursor: "pointer",
                transition: "0.3s all",
                "&:hover": {
                  backgroundColor: colors.hoverBlack,
                },
              }}
            >
              <Search /> <Typography>Search</Typography>
            </Stack>
          </Box>
          <Box px="30px" py="16px" sx={{ overflow: "scroll" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb="10px"
            >
              <Stack direction="row" gap="10px">
                <DashboardOutlined />{" "}
                <Typography fontSize="14px">Workspaces</Typography>
              </Stack>
              <Stack
                alignItems="center"
                justifyContent="center"
                width="30px"
                height="30px"
                borderRadius="8px"
                bgcolor={colors.white}
                border={`1px solid ${colors.black}`}
              >
                <Add />
              </Stack>
            </Stack>
            <Box>
              {["Two workspace"].map((workspace) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  p="10px 14px"
                  borderRadius="8px"
                  m="7px"
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s all",
                    "&:hover": {
                      backgroundColor: colors.hoverBlack,
                    },
                  }}
                >
                  <Typography fontSize="14px">{workspace}</Typography>
                  <Typography fontSize="14px">1</Typography>
                </Stack>
              ))}
            </Box>
          </Box>
          <Box
            position="absolute"
            bottom="0px"
            px="30px"
            py="15px"
            width="100%"
            boxSizing="border-box"
            borderTop={`2px solid ${colors.white}`}
          >
            <Typography fontSize="14px">Responses collected</Typography>
            <Box
              width="100%"
              height="4px"
              bgcolor={colors.hoverBlack}
              my="8px"
            />
            <Stack direction="row">
              <Typography fontSize="18px" fontWeight="700" mt="-2px">
                0
              </Typography>
              <Typography fontWeight="500" fontSize="16px">
                / 10
              </Typography>
            </Stack>
            {/* <Typography my="15px" fontSize="14px">
              Resets on Oct 29
            </Typography> */}
            <Button
              sx={{
                padding: "3px 10px",
                borderRadius: "6px",
                border: "0.5px solid black",
                backgroundColor: colors.white,
                color: "black",
                fontSize: "10px",
                cursor: "pointer",
              }}
            >
              Increase Response Limit
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 1, p: isMobile ? "0" : "20px", overflowY: "auto" }}>
          <WorkSpaceUISetting
            setOpenSideDashboard={setOpenSideDashboard}
            openSideDashboard={openSideDashboard}
          />
          {isLoading && <Spinner />}
          {data && (
            <>
              {data.data.forms.length > 0 ? (
                <Box>
                  <Stack
                    my="10px"
                    padding="10px 0px"
                    width="100%"
                    direction="row"
                    justifyContent="flex-end"
                  >
                    <Stack direction="row" gap="20px" alignItems="center">
                      {formTabHeaders.map((header) => {
                        return (
                          <Typography
                            fontSize="13px"
                            minWidth="100px"
                            width="auto"
                          >
                            {header}
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Stack>
                  {data.data.forms.map((form: IForm, index: number) => (
                    <Box key={index} my="10px" mx="15px">
                      <FormTab
                        form={form}
                        getFormAndOpen={() => getFormAndOpen(form._id)}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <NoFormUI openCreateForm={openCreateForm} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default Dashboard;
