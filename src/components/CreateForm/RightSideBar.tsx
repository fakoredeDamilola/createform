import { Box, Divider, Stack, Typography } from "@mui/material";
import { MdOutlineShortText } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QuestionSettings from "./QuestionSettings";
import { IQuestion } from "../../interfaces/IQuestion";
import { FormItemType } from "../../utils/constants";
import StaticScreenSetting from "./StaticScreenSetting";
import { IStaticPage } from "../../interfaces/IStaticPage";
import { useDispatch } from "react-redux";
import { createNewFormEncryption } from "../../store/slices/form.slice";

const RightSideBar = () => {
  const selectedQuestion = useSelector(
    (state: RootState) => state.form.selectedQuestion
  );
  const form = useSelector((state: RootState) => state.form.form);
  const dispatch = useDispatch();

  const tabs = ["Content", "Design"];
  const questionFormat = [
    {
      name: "Text",
      icon: <MdOutlineShortText style={{ fontSize: "22px" }} />,
    },
    {
      name: "Video",
      icon: <CiVideoOn style={{ fontSize: "18px" }} />,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedQuestionFormat, setSelectedQuestionFormat] = useState(
    questionFormat[0].name
  );

  const createNewEncryption = (value: string) => {
    dispatch(createNewFormEncryption(value));
  };

  return (
    <Box
      minWidth="250px"
      bgcolor={colors.secondaryColor}
      padding="0 12px"
      borderRadius="12px"
    >
      <Stack
        direction="row"
        gap="15px"
        sx={{
          borderRadius: "12px 12px 0 0",

          width: "100%",
          borderBottom: `2px solid ${colors.white}`,
        }}
      >
        {tabs.map((tab, index) => (
          <Typography
            padding="12px 0"
            borderBottom={selectedTab === index ? "2px solid black" : "none"}
            key={index}
            sx={{ cursor: "pointer" }}
            color={selectedTab === index ? colors.black : colors.textButton}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </Typography>
        ))}
      </Stack>
      <Box my="15px">
        {selectedQuestion.formItemType === FormItemType.QUESTION ? (
          <>
            <Typography
              variant="subtitle1"
              my="20px"
              sx={{ color: colors.black }}
            >
              Question
            </Typography>
            <Stack direction="row">
              {questionFormat.map((value, index) => (
                <Stack
                  key={index}
                  display="row"
                  justifyContent="center"
                  alignItems="center"
                  width="50%"
                  padding="7px 0"
                  direction="row"
                  gap="8px"
                  border={`1px solid ${colors.borderTwo}`}
                  fontSize="14px"
                  sx={{
                    backgroundColor:
                      value.name.toLowerCase() ===
                      selectedQuestionFormat.toLowerCase()
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
                    setSelectedQuestionFormat("Text");
                  }}
                >
                  {value.icon} {value.name}
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <Typography variant="subtitle1" sx={{ color: colors.black }}>
            Start Screen
          </Typography>
        )}

        <Divider sx={{ margin: "15px 0" }} />
        <Box>
          <Typography variant="subtitle1" sx={{ color: colors.black }}>
            Settings
          </Typography>
          {selectedQuestion.formItemType === FormItemType.QUESTION ? (
            <QuestionSettings
              selectedQuestion={selectedQuestion as IQuestion}
            />
          ) : (
            <StaticScreenSetting
              staticPage={selectedQuestion as IStaticPage}
              formSettings={form.formSettings}
              createNewEncryption={createNewEncryption}
              encryptionDetails={form.encryptionDetails}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RightSideBar;
