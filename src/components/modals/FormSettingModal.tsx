import React, { useEffect, useState } from "react";
import { ModalBackdrop, ModalContent } from "./styles";

import {
  Box,
  List,
  ListItemText,
  Divider,
  Stack,
  Typography,
  Switch,
  Button,
} from "@mui/material";
import { colors } from "../../styles/colors";
import ListItemButton from "@mui/material/ListItemButton";
import { useDispatch } from "react-redux";
import {
  updateFormDetails,
  updateFormSettingDetails,
} from "../../store/slices/form.slice";
import { IFormSetting } from "../../interfaces/IFormSetting";
import { IForm } from "../../interfaces/IForm";

interface FormSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: IForm;
}

const FormSettingModal: React.FC<FormSettingModalProps> = ({
  isOpen,
  onClose,
  form,
}) => {
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [totalFormTimeLimit, setTotalFormTimeLimit] = useState(
    form?.totalFormTimeLimit ?? 0
  );
  const [formSettings, setFormSettings] = useState<IFormSetting>({
    createFormBranding: true,
    navigationArrow: true,
    progressBar: true,
    questionNumber: true,
    addAnswerToQuestion: false,
    addTimeLimitToForm: false,
    popQuiz: false,
  });

  useEffect(() => {
    if (form?.formSettings) {
      setFormSettings(form?.formSettings);
      setTotalFormTimeLimit(form?.totalFormTimeLimit ?? 0);
    }
  }, [form]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    dispatch(
      updateFormSettingDetails({
        formSettings,
      })
    );
    dispatch(
      updateFormDetails({
        value: `${totalFormTimeLimit}`,
        key: "totalFormTimeLimit",
      })
    );

    onClose();
  };

  const updateTotalTimeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTotalFormTimeLimit(parseFloat(value));
  };

  const updateFormSettings = (setting: string, value: boolean) => {
    setFormSettings((prevState) => ({ ...prevState, [setting]: value }));
  };

  return (
    <ModalBackdrop open={isOpen}>
      <ModalContent
        width="70%"
        style={{ backgroundColor: colors.secondaryColor, padding: "30px" }}
      >
        <Stack
          direction="row"
          width="100%"
          borderRadius="20px 20px 0 0"
          justifyContent="space-between"
        >
          <Box pb="20px">
            <Typography fontSize="24px">Form Settings</Typography>
          </Box>
        </Stack>
        <Stack direction="row" gap="20px">
          <Box sx={{ width: "300px" }}>
            <List component="nav">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="Inbox" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText primary="Trash" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText primary="Spam" />
              </ListItemButton>
            </List>
          </Box>
          <Box
            borderRadius="12px"
            boxSizing="border-box"
            width="100%"
            padding="20px"
            minHeight="100%"
            bgcolor={colors.white}
          >
            <Typography fontSize="20px" textAlign="left">
              Display
            </Typography>
            <Box>
              {[
                { key: "createFormBranding", text: "Createform Branding" },
                { key: "navigationArrow", text: "Navigation Arrows" },
                { key: "progressBar", text: "Progress Bar" },
                { key: "questionNumber", text: "Question Number" },
                {
                  key: "addAnswerToQuestion",
                  text: "Add Answers To Questions",
                },
                {
                  key: "addTimeLimitToForm",
                  text: "Add Time Limit to Form",
                },
                {
                  key: "popQuiz",
                  text: "Make it a Pop Quiz",
                },
              ].map((item, index) => {
                return (
                  <>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      my="15px"
                      alignItems="center"
                      key={index}
                    >
                      <Typography fontSize="14px">{item.text}</Typography>
                      <Switch
                        checked={
                          formSettings[item.key as keyof typeof formSettings] ??
                          false
                        }
                        onChange={(e) =>
                          updateFormSettings(item.key, e.target.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Stack>
                    {item.key === "addTimeLimitToForm" &&
                      formSettings.addTimeLimitToForm && (
                        <Box>
                          <input
                            type="number"
                            style={{
                              borderRadius: "8px",
                              width: "200px",
                              height: "35px",
                              border: `1px solid ${colors.buttonBorder}`,
                              paddingLeft: "10px",
                            }}
                            placeholder="0 - 99999999(seconds)"
                            value={totalFormTimeLimit}
                            onChange={updateTotalTimeValue}
                          />
                        </Box>
                      )}
                  </>
                );
              })}
            </Box>
          </Box>
        </Stack>
        <Stack
          position="absolute"
          bottom="20px"
          width="100%"
          left="0"
          direction="row"
          justifyContent="flex-end"
          gap="15px"
          paddingRight="40px"
        >
          <Button
            variant="outlined"
            sx={{ width: "80px" }}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "80px" }}
            variant="contained"
            onClick={closeModal}
          >
            Save
          </Button>
        </Stack>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default FormSettingModal;
