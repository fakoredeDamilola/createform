import { Box, Input, List, ListItem, Stack } from "@mui/material";
import ContentSheet from "./ContentSheet";
import AutoGrowingTextArea from "../../AutoGrowingTextArea";
import { useEffect, useState } from "react";
import { IStaticPage } from "../../../interfaces/IStaticPage";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FormItemType, FormStaticType } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { updateStaticPageInfo } from "../../../store/slices/form.slice";

const FirstPageSheet = () => {
  const [debouncedFirstPageTitle, setDebouncedFirstPageTitle] = useState("");
  const [firstPageDescription, setFirstPageDescription] = useState<string>("");
  const dispatch = useDispatch();

  const encryptionDetails = useSelector(
    (state: RootState) => state.form.form.encryptionDetails
  );
  const staticSheet = useSelector(
    (state: RootState) => state.form.form.formStartPage
  );

  const updateFirstPageDetails = (value: string, key: string) => {
    if (staticSheet?.questionId) {
      dispatch(
        updateStaticPageInfo({
          value,
          key,
          staticPage: FormStaticType.START,
        })
      );
    }
  };

  useEffect(() => {
    if (staticSheet && staticSheet.formItemType === FormItemType.STATIC) {
      setDebouncedFirstPageTitle((staticSheet as IStaticPage).pageTitle);
      setFirstPageDescription((staticSheet as IStaticPage).pageDescription);
    }
  }, [staticSheet]);

  useEffect(() => {
    if (debouncedFirstPageTitle !== "") {
      updateFirstPageDetails(debouncedFirstPageTitle, "pageTitle");
    }
  }, [debouncedFirstPageTitle, dispatch]);

  return (
    <ContentSheet>
      <Stack direction="row" width="100%">
        <Box>
          <AutoGrowingTextArea
            fontSize="16px"
            placeholder="Title of Form"
            value={debouncedFirstPageTitle}
            setValue={setDebouncedFirstPageTitle}
          />
          <AutoGrowingTextArea
            fontSize="12px"
            placeholder="Description (optional)"
            value={firstPageDescription}
            setValue={(value: string) => {
              setFirstPageDescription(value);
              updateFirstPageDetails(value, "pageDescription");
            }}
          />
          <Box>
            {encryptionDetails?.map((detail, index) => (
              <Input
                key={index}
                sx={{ width: "100%", my: "10px" }}
                value=""
                disabled
                placeholder={`Enter your ${detail}`}
                name={detail}
              />
            ))}
          </Box>

          {staticSheet.autoInstructions && (
            <Box position="absolute" bottom="20px">
              <List>
                {staticSheet.autoInstructions.map((instruction) => (
                  <ListItem sx={{ fontSize: "12px" }}>{instruction}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Stack>
    </ContentSheet>
  );
};

export default FirstPageSheet;
