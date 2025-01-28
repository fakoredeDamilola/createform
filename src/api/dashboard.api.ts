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
  answers,
  formId,
  formSlug,
  timeStarted,
  responseType,
}: {
  responseId?: string;
  answers: IAnswer[];
  formId: string;
  formSlug: string;
  timeStarted: number | null;
  responseType: ResponseType;
}) => {
  let diff, noOfQuestionsAnswered;
  if (timeStarted) {
    const currentTime = new Date();
    diff = (currentTime.getTime() - timeStarted) / 1000;
  }

  if (responseType === ResponseType.CREATE) {
    noOfQuestionsAnswered = answers.filter(
      (answer) => answer.answeredQuestion === true
    )?.length;
  } else {
    diff = timeStarted;
    noOfQuestionsAnswered = 1;
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
  } = {
    encryptionType: EncryptionType.NONE,
    submissionDate: new Date(),
    noOfQuestionsAnswered,
    totalTimeTaken: `${diff}`,
    formId,
    formSlug,
    answers,
    responseType,
  };
  if (responseId) {
    answerResponse.responseId = responseId;
  }
  const response = await axiosClient.post("/response/create", answerResponse);

  if (responseType === ResponseType.CREATE) {
    await axiosClient.put(`/form/update/insight/${formId}`, { submitted: 1 });
  }
  return { data: response.data, responseType };
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
};
