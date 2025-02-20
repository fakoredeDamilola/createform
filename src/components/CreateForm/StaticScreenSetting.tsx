import React, { useState } from "react";
import { IStaticPage } from "../../interfaces/IStaticPage";
import { Box, Button, Stack } from "@mui/material";
import { IFormSetting } from "../../interfaces/IFormSetting";
import InputModal from "../modals/InputModal";
import ActionTab from "./custom/ActionTab";
import { useDispatch } from "react-redux";
import { removeValueFromEncryption } from "../../store/slices/form.slice";
import { FormStaticType } from "../../utils/constants";

const StaticScreenSetting = ({
  staticPage,
  formSettings,
  createNewEncryption,
  encryptionDetails,
}: {
  staticPage: IStaticPage;
  formSettings: IFormSetting;
  createNewEncryption: (value: string) => void;
  encryptionDetails: string[];
}) => {
  const dispatch = useDispatch();
  const [openInputModal, setOpenInputModal] = useState(false);

  const removeEncryptionFromList = (index: number) => {
    dispatch(removeValueFromEncryption(index));
  };

  return (
    <>
      {staticPage.formStaticType === FormStaticType.START ? (
        <Box>
          <InputModal
            isOpen={openInputModal}
            onClose={() => setOpenInputModal(false)}
            onSave={createNewEncryption}
          />
          <Stack flexDirection="row" gap="10px">
            {encryptionDetails &&
              typeof encryptionDetails === "object" &&
              encryptionDetails.map((text, index) => (
                <ActionTab
                  selectedOption={0}
                  text={text}
                  key={index}
                  onClick={() => removeEncryptionFromList(index)}
                />
              ))}
          </Stack>

          <Box width="100%" textAlign="center" mt="30px">
            <Button
              variant="contained"
              sx={{
                width: "80%",
                height: "35px",
                borderRadius: "5px",
              }}
              disabled={formSettings?.encryption}
              onClick={() => setOpenInputModal(true)}
            >
              Create new encryption
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>More Features coming soon</Box>
      )}
    </>
  );
};

export default StaticScreenSetting;
