import axiosClient from "../axiosMethod";
import { IAnswer } from "../interfaces/IAnswer";
import { IForm } from "../interfaces/IForm";
import { IQuestion } from "../interfaces/IQuestion";
import { v4 as uuidv4 } from "uuid";
import { EncryptionType, ResponseType } from "../utils/constants";

const getUserInfo = async () => {
  const response = await axiosClient.get("/user/me");

  return response;
};

const deleteQuestionApi = async (questionId: string, formId: string) => {
  console.log({ questionId, formId });
  await axiosClient.delete(`/form/delete/question/${questionId}/${formId}`);
};

const createNewQuestionApi = async (newQuestion: IQuestion) => {
  const response = await axiosClient.post(`/form/question/new`, newQuestion);

  return response.data;
};

const getUserForms = async () => {
  const response = await axiosClient.get("/form/get");

  return response;
};

const getFormById = async (_id: string) => {
  const response = await axiosClient.get(`/form/get/${_id}`);
  return response;
};

const getResponseById = async (_id: string) => {
  console.log(_id);
  const response = await axiosClient.get(`/response/get/${_id}`);

  return response;
};

const getFormAndResponseById = async (_id: string) => {
  const response = await getResponseById(_id);
  const form = await getFormBySlug(response.data.formSlug, true);

  return { response: response.data, form: form.data };
};

const getFormBySlug = async (slug: string, includeAnswer?: boolean) => {
  const response = await axiosClient.get(
    `/form/${slug}?${includeAnswer ? "answer=yes" : "answer=no"}`
  );
  return response;
};

const updateFormSettingDetails = async (newForm: IForm) => {
  console.log({ newForm });
  const response = await axiosClient.put("/form/update", newForm);
  return response.data;
};

const createNewFormApi = async (newForm: { formName: string }) => {
  const formDetails = {
    formName: newForm.formName,
    formStartPageId: uuidv4(),
    formEndPageId: uuidv4(),
  };
  const response = await axiosClient.post("/form/new", formDetails);
  return response.data;
};

const updateFormInsightApi = async ({
  formInsight,
  formID,
}: {
  formID: string;
  formInsight: { [key: string]: number };
}) => {
  const updateFormInsight = await axiosClient.put(
    `/form/update/insight/${formID}`,
    formInsight
  );
  return updateFormInsight;
};

const createResponseApi = async ({
  responseId,
  encryptionArray,
  answers,
  formId,
  formSlug,
  timeStarted,
  responseType,
  encryptionDetails,
}: {
  responseId?: string;
  answers: IAnswer[];
  formId: string;
  formSlug: string;
  encryptionArray?: string[];
  timeStarted: number | null;
  responseType: ResponseType;
  encryptionDetails?: { [key: string]: string };
}) => {
  let diff, noOfQuestionsAnswered, encryptionDetailsObj;
  if (timeStarted) {
    const currentTime = new Date();
    diff = (currentTime.getTime() - timeStarted) / 1000;
  }

  if (responseType === ResponseType.CREATE) {
    noOfQuestionsAnswered = answers.filter(
      (answer) => answer.answeredQuestion === true
    )?.length;
    if (encryptionArray) {
      console.log({ encryptionArray });
      const encryptionDetails = encryptionArray.reduce(
        (acc: { [key: string]: string }, obj: string) => {
          acc[obj] = "";
          return acc;
        },
        {}
      );
      encryptionDetailsObj = encryptionDetails;
    }
  } else {
    diff = timeStarted;
    noOfQuestionsAnswered = 1;
    encryptionDetailsObj = encryptionDetails;
  }

  const answerResponse: {
    encryptionType: EncryptionType;
    submissionDate: Date;
    noOfQuestionsAnswered: number;
    totalTimeTaken: string;
    formId: string;
    formSlug: string;
    answers: IAnswer[];
    responseId?: string;
    responseType: string;
    encryptionDetails?: { [key: string]: string };
  } = {
    encryptionType: EncryptionType.NONE,
    submissionDate: new Date(),
    noOfQuestionsAnswered,
    totalTimeTaken: `${diff}`,
    formId,
    formSlug,
    answers,
    responseType,
    encryptionDetails: encryptionDetailsObj,
  };
  if (responseId) {
    answerResponse.responseId = responseId;
  }
  console.log({ answerResponse });
  const response = await axiosClient.post("/response/create", answerResponse);

  if (responseType === ResponseType.CREATE) {
    await axiosClient.put(`/form/update/insight/${formId}`, { submitted: 1 });
  }
  return { data: response.data, responseType };
};

const updateAnswerInResponseApi = async ({
  responseId,
  answer,
  formId,
  popQuiz,
  responseSubmitted,
}: {
  responseId: string;
  answer: IAnswer;
  formId: string;
  popQuiz?: boolean;
  responseSubmitted?: boolean;
}) => {
  const answerResponse = {
    responseId,
    answer,
    formId,
    popQuiz: popQuiz ?? false,
    responseSubmitted: responseSubmitted ?? false,
  };
  console.log({ answerResponse }, "EIEIIE");
  const response = await axiosClient.post(
    "/response/update/answer",
    answerResponse
  );
  console.log({ response });
  return response;
};

export {
  getUserInfo,
  updateFormSettingDetails,
  createNewFormApi,
  getUserForms,
  getFormById,
  getResponseById,
  getFormBySlug,
  createResponseApi,
  updateFormInsightApi,
  deleteQuestionApi,
  createNewQuestionApi,
  getFormAndResponseById,
  updateAnswerInResponseApi,
};
