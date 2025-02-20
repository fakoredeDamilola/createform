import axiosClient from "../axiosMethod";
import { IAnswer } from "../interfaces/IAnswer";
import { IForm } from "../interfaces/IForm";
import { IQuestion } from "../interfaces/IQuestion";
import { v4 as uuidv4 } from "uuid";
import { EncryptionType } from "../utils/constants";
import { formatFormQuestions } from "../utils/functions";

const getUserInfo = async () => {
  const response = await axiosClient.get("/user/me");

  return response;
};

const deleteQuestionApi = async (questionId: string, formId: string) => {
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
  const formQuestionsFormatted = formatFormQuestions(newForm.questions);
  const response = await axiosClient.put("/form/update", {
    ...newForm,
    questions: formQuestionsFormatted,
  });
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
  encryptionArray,
  answers,
  formId,
  formSlug,
  timeStarted,
}: {
  responseId?: string;
  answers: IAnswer[];
  formId: string;
  formSlug: string;
  encryptionArray?: string[];
  timeStarted: number | null;
}) => {
  let diff, encryptionDetailsObj;
  if (timeStarted) {
    const currentTime = new Date();
    diff = (currentTime.getTime() - timeStarted) / 1000;
  }
  if (encryptionArray) {
    const encryptionDetails = encryptionArray.reduce(
      (acc: { [key: string]: string }, obj: string) => {
        acc[obj] = "";
        return acc;
      },
      {}
    );
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
    encryptionDetails?: { [key: string]: string };
  } = {
    encryptionType: EncryptionType.NONE,
    submissionDate: new Date(),
    noOfQuestionsAnswered: 0,
    totalTimeTaken: `${diff}`,
    formId,
    formSlug,
    answers,
    encryptionDetails: encryptionDetailsObj,
  };

  const response = await axiosClient.post("/response/create", answerResponse);

  await axiosClient.put(`/form/update/insight/${formId}`, { submitted: 1 });

  return { data: response.data };
};

const updateEncryptionDetailsApi = async (encryptionInfo: {
  responseId: string;
  encryptionDetails?: { [key: string]: string };
}) => {
  const response = await axiosClient.put(
    "/response/update/encryption-details",
    encryptionInfo
  );
  return response;
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
  popQuiz: boolean;
  responseSubmitted: boolean;
}) => {
  const answerResponse = {
    responseId,
    answer,
    formId,
    popQuiz,
    responseSubmitted,
  };
  const response = await axiosClient.post(
    "/response/update/answer",
    answerResponse
  );
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
  updateEncryptionDetailsApi,
};
