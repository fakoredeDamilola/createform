import { createNewQuestionApi } from "../api/dashboard.api";
import { QuestionFactory } from "../factory/questionFactory";
import { IAnswer } from "../interfaces/IAnswer";
import { IFormSetting } from "../interfaces/IFormSetting";
import { IOption } from "../interfaces/IOption";
import { IQuestion } from "../interfaces/IQuestion";
import { IQuestionAnswer } from "../interfaces/IQuestionAnswer";
import { BooleanLabel, OptionLabel, QuestionType } from "./constants";
import { v4 as uuidv4 } from "uuid";

function generateRandomName(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function updateStartPageInstruction(
  formSettings: IFormSetting,
  timeLimit?: number
) {
  const instructions = [];
  if (formSettings.popQuiz) {
    instructions.push(
      "This is a pop quiz i.e you see the answer immediately you answer the question"
    );
  }
  if (formSettings.addTimeLimitToForm && timeLimit) {
    instructions.push(
      `This form has a timeLimit ${formatTime(timeLimit)} of minutes`
    );
  }
  return instructions;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function createAQuestionSkeleton(
  questionType: QuestionType,
  formId: string,
  questionNumber: number
) {
  const newQuestion = QuestionFactory.createNewQuestion(questionType, {
    formId,
    questionId: uuidv4(),
    questionFormat: "Text",
    questionNumber,
  });
  return newQuestion;
}

async function buildNewQuestion(
  newQuestionNumber: number,
  questionType: QuestionType,
  formId: string
) {
  const newQuestion = createAQuestionSkeleton(
    questionType,
    formId,
    newQuestionNumber
  );
  if (newQuestion) {
    if (questionType === QuestionType.multiple_choice) {
      const optionLabel = getNextEnumValue(OptionLabel);
      const newOption = createNewOptionSkeleton(optionLabel);
      if ("options" in newQuestion) {
        newQuestion.options = [newOption];
      }
    } else if (questionType === QuestionType.boolean) {
      const booleanOptions = [
        createNewOptionSkeleton(BooleanLabel.YES, "YES"),
        createNewOptionSkeleton(BooleanLabel.NO, "NO"),
      ];
      if ("options" in newQuestion) {
        newQuestion.options = booleanOptions;
      }
    }
  }
  if (newQuestion) {
    const questionInfo: IQuestion = { ...newQuestion };
    const response = await createNewQuestionApi(questionInfo);

    return response;
  }
}

function getNextEnumValue<T extends Record<string, unknown>>(
  enumObj: T,
  currentValue?: T[keyof T]
): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][];
  const currentIndex = currentValue ? values.indexOf(currentValue) : -1;
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}

function createNewOptionSkeleton(
  optionLabel: OptionLabel | BooleanLabel,
  optionText?: string
) {
  const newOption: IOption = {
    optionId: uuidv4(),
    optionText: optionText ?? "",
    optionLabel,
    selectedOption: false,
  };
  return newOption;
}

function renumberQuestions(questions: IQuestion[]) {
  return questions.map((question, index) => {
    return {
      ...question,
      questionNumber: index + 1,
    };
  });
}

function getResponseArrayFromForm(questions: IQuestion[]) {
  const response = questions.reduce((accumulator, current) => {
    if (Object.values(QuestionType).includes(current.questionType)) {
      accumulator.push({
        timeLeft: current.totalTime ?? -1,
        answerId: uuidv4(),
        scoreForQuestion: 0,
        questionId: current._id ?? current.questionId,
        questionType: current.questionType,
        questionNumber: current.questionNumber,
        optionId: "",
        textResponse: "",
        disabledResponse: false,
        answeredQuestion: false,
      });
    }
    return accumulator;
  }, [] as IAnswer[]);

  return response;
}

function createNewQuestionAnswer(
  questionAnswer: string,
  formId: string,
  questionId: string,
  questionType: QuestionType
) {
  return {
    questionAnswerId: uuidv4(),
    questionId,
    formId,
    questionType,
    answerResults: [questionAnswer],
  } as IQuestionAnswer;
}

function formatDateForTable(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

function getTotalResponses(answers: IAnswer[]) {
  const totalResponse = answers.filter((answer) => {
    const isTextResponseValid =
      (answer.questionType === QuestionType.long_text ||
        answer.questionType === QuestionType.short_text) &&
      !!answer.textResponse;

    const isMultipleChoiceValid =
      answer.questionType === QuestionType.multiple_choice && !!answer.optionId;

    return isTextResponseValid || isMultipleChoiceValid;
  });

  return totalResponse;
}

function checkQuestionRule(question: IQuestion, answer: IAnswer) {
  const rule = { showBox: false, text: "" };
  if (
    question.required &&
    (!answer.textResponse ||
      !answer.optionId ||
      answer.optionIds?.length === 0 ||
      !answer.disabledResponse)
  ) {
    rule.showBox = true;
    rule.text = "Please fill this";
  }

  return rule;
}

function checkResponseLength(text: string, characterLimit?: string) {
  return characterLimit && parseInt(characterLimit) >= text.length;
}

function formatDate(isoDateString: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(isoDateString);

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

function formatCamelCase(value: string) {
  const spaced = value.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export {
  generateRandomName,
  createAQuestionSkeleton,
  getNextEnumValue,
  createNewOptionSkeleton,
  renumberQuestions,
  getResponseArrayFromForm,
  checkQuestionRule,
  checkResponseLength,
  getTotalResponses,
  formatDate,
  formatDateForTable,
  formatCamelCase,
  createNewQuestionAnswer,
  buildNewQuestion,
  updateStartPageInstruction,
  formatTime,
};
