import { Box, Divider, Stack, Switch, Typography } from "@mui/material";
import { MdOutlineShortText } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { colors } from "../../styles/colors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestionInfo } from "../../store/slices/form.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QuestionType } from "../../utils/constants";

const RightSideBar = () => {
  const dispatch = useDispatch();
  const selectedQuestion = useSelector(
    (state: RootState) => state.form.selectedQuestion
  );
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
  const [questionSettings, setQuestionSettings] = useState({
    required: selectedQuestion.required ?? false,
    characterLimit: selectedQuestion.characterLimit ?? false,
    multipleSelection: selectedQuestion.multipleSelection ?? false,
    randomize: selectedQuestion.randomize ?? false,
  });
  const [maxCharacters, setMaxCharacters] = useState(
    selectedQuestion.maxCharacters ?? "0"
  );
  const [selectedQuestionFormat, setSelectedQuestionFormat] = useState(
    questionFormat[0].name
  );

  useEffect(() => {
    if (selectedQuestion) {
      setQuestionSettings({
        required: selectedQuestion.required,
        characterLimit: selectedQuestion.characterLimit,
        multipleSelection: selectedQuestion.multipleSelection ?? false,
        randomize: selectedQuestion.randomize ?? false,
      });
    }
  }, [selectedQuestion]);

  const updateQuestionDetails = (setting: string, value: boolean) => {
    setQuestionSettings((prevState) => ({ ...prevState, [setting]: value }));
    dispatch(
      updateQuestionInfo({
        questionId: selectedQuestion.questionId,
        value,
        key: setting,
      })
    );
  };

  const updateMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMaxCharacters(value);
    dispatch(
      updateQuestionInfo({
        questionId: selectedQuestion.questionId,
        value,
        key: "maxCharacters",
      })
    );
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
        <Typography variant="subtitle1" my="20px" sx={{ color: colors.black }}>
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
        <Divider sx={{ margin: "15px 0" }} />
        <Box>
          <Typography variant="subtitle1" sx={{ color: colors.black }}>
            Settings
          </Typography>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              mt="25px"
              alignItems="center"
            >
              <Typography fontSize="14px">Required</Typography>
              <Switch
                checked={questionSettings.required}
                onChange={(e) =>
                  updateQuestionDetails("required", e.target.checked)
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            </Stack>
            {selectedQuestion.questionType === QuestionType.short_text && (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  my="15px"
                  alignItems="center"
                >
                  <Typography fontSize="14px">Max characters</Typography>
                  <Switch
                    checked={questionSettings.characterLimit}
                    onChange={(e) =>
                      updateQuestionDetails("characterLimit", e.target.checked)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <input
                  type="number"
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    height: "35px",
                    border: `1px solid ${colors.buttonBorder}`,
                    paddingLeft: "10px",
                    display: questionSettings.characterLimit ? "block" : "none",
                  }}
                  placeholder="0 - 99999999"
                  value={maxCharacters}
                  onChange={updateMaxValue}
                />
              </>
            )}
            {selectedQuestion.questionType === QuestionType.multiple_choice && (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt="25px"
                  alignItems="center"
                >
                  <Typography fontSize="14px">Multiple Selection</Typography>
                  <Switch
                    checked={questionSettings.multipleSelection}
                    onChange={(e) =>
                      updateQuestionDetails(
                        "multipleSelection",
                        e.target.checked
                      )
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt="25px"
                  alignItems="center"
                >
                  <Typography fontSize="14px">Randomize</Typography>
                  <Switch
                    checked={questionSettings.randomize}
                    onChange={(e) =>
                      updateQuestionDetails("randomize", e.target.checked)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSideBar;
