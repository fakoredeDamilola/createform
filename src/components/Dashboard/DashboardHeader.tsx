import { Box, Button, Stack } from "@mui/material";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import ProfileTab from "./ProfileTab";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import UserTab from "./UserTab";
import { getRoute, routes } from "../../utils/routes";
import RouteTab from "./RouteTab";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setOpenPublishModal,
  updateFormName,
} from "../../store/slices/form.slice";
import { colors } from "../../styles/colors";
import { DashboardHeaderTabs } from "../../utils/constants";
import { setSelectedDashboardTab } from "../../store/slices/user.slice";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateFormDetails } from "../../api/dashboard.api";

const DashboardHeader = () => {
  const pathname = window.location.pathname;
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form: formState, user } = useSelector((state: RootState) => state);
  const { form } = formState;
  const { selectedDashboardTab } = user;

  const [debouncedFormName, setDebouncedFormName] = useState(form.formName);

  const debouncedName = useDebounce(debouncedFormName, 500);

  const { mutate } = useMutation({
    mutationFn: updateFormDetails,
    onSuccess: (data) => {
      alert("success");
      console.log("Item created successfully:", data);
    },
    onError: (error) => {
      alert("error");
      console.error("Error creating item:", error);
    },
  });

  useEffect(() => {
    if (debouncedName && form?._id) {
      dispatch(updateFormName({ formName: debouncedName }));
    }
  }, [debouncedName, form?._id, dispatch]);

  useEffect(() => {
    setDebouncedFormName(form?.formName);
  }, [form?.formName]);

  useEffect(() => {
    dispatch(setSelectedDashboardTab({ selectedTab: 1 }));
  }, [pathname, dispatch]);

  const openPublishModal = () => {
    mutate({ ...form, publish: true });
    dispatch(setOpenPublishModal(true));
  };

  const saveModal = () => {
    mutate({ ...form, publish: false });
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap="30px"
      height="40px"
      boxSizing="border-box"
    >
      <Box width="250px" flex="1">
        {pathname === routes.dashboard ? (
          <ProfileTab />
        ) : (
          <RouteTab
            formName={debouncedFormName}
            setDebouncedFormName={setDebouncedFormName}
          />
        )}
      </Box>

      {(pathname.includes("/form/create") ||
        pathname.includes("/form/result")) && (
        <Box position="relative" width="100%">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="55px"
            position="relative"
            top="-10px"
            gap="15px"
            sx={{
              width: "100%",
            }}
          >
            {DashboardHeaderTabs.map((tab, index) => (
              <Stack
                justifyContent="center"
                alignItems="center"
                height="100%"
                borderBottom={
                  selectedDashboardTab === index ? "2px solid black" : "none"
                }
                key={index}
                sx={{ cursor: "pointer" }}
                color={
                  selectedDashboardTab === index
                    ? colors.black
                    : colors.textButton
                }
                onClick={() => {
                  if (index !== selectedDashboardTab) {
                    const route = getRoute(tab.link, {
                      formId: params?.formId ?? "",
                    });
                    navigate(route);
                    dispatch(setSelectedDashboardTab({ selectedTab: index }));
                  }
                }}
              >
                {tab.text}
              </Stack>
            ))}
          </Stack>

          {pathname.includes("form/create") && (
            <Stack direction="row" position="absolute" right="0" top="0">
              <Button
                variant="contained"
                sx={{ marginRight: "10px", height: "35px" }}
                onClick={saveModal}
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.mutedCoral,
                  color: colors.white,
                  height: "35px",
                }}
                onClick={openPublishModal}
              >
                <TiLocationArrowOutline
                  style={{
                    fontSize: "20px",
                    marginTop: "-4px",
                    marginRight: "5px",
                  }}
                />
                Publish
              </Button>
            </Stack>
          )}
        </Box>
      )}

      <Stack justifyContent="flex-end" direction="row" minWidth="250px">
        <UserTab />
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
