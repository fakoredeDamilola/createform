import { Box, Stack } from "@mui/material";
import ContentSheet from "./ContentSheet";
import AutoGrowingTextArea from "../../AutoGrowingTextArea";
import { useEffect, useState } from "react";
import { IStaticPage } from "../../../interfaces/IStaticPage";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FormItemType, FormStaticType } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { updateStaticPageInfo } from "../../../store/slices/form.slice";

const LastPageSheet = () => {
  const [debouncedFirstPageTitle, setDebouncedFirstPageTitle] = useState("");
  const [firstPageDescription, setFirstPageDescription] = useState<string>("");
  const dispatch = useDispatch();

  const staticSheet = useSelector(
    (state: RootState) => state.form.form.formEndPage
  );

  const updateFirstPageDetails = (value: string, key: string) => {
    if (staticSheet?.questionId) {
      dispatch(
        updateStaticPageInfo({
          value,
          key,
          staticPage: FormStaticType.END,
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
        </Box>
      </Stack>
    </ContentSheet>
  );
};

export default LastPageSheet;
