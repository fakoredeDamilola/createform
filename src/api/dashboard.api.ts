import axiosClient from "../axiosMethod";
import { IAnswer } from "../interfaces/IAnswer";
import { IForm } from "../interfaces/IForm";
import { EncryptionType } from "../utils/constants";

const getUserInfo = async () => {
  const response = await axiosClient.get("/user/me");
  console.log({ response });
  return response;
};

const getUserForms = async () => {
  const response = await axiosClient.get("/form/get");
  console.log({ response });
  return response;
};

const getFormById = async (_id: string) => {
  console.log(_id);
  const response = await axiosClient.get(`/form/get/${_id}`);
  return response;
};

const getFormBySlug = async (slug: string) => {
  const response = await axiosClient.get(`/form/${slug}`);
  return response;
};

const updateFormDetails = async (newForm: IForm) => {
  console.log({ newForm });
  const response = await axiosClient.put("/form/update", newForm);
  return response.data;
};

const createNewFormApi = async (newForm: { formName: string }) => {
  const response = await axiosClient.post("/form/new", newForm);
  return response.data;
};

const updateFormInsightApi = async ({
  formInsight,
  formID,
}: {
  formID: string;
  formInsight: { [key: string]: number };
}) => {
  console.log({ formInsight });
  const updateFormInsight = await axiosClient.put(
    `/form/update/insight/${formID}`,
    formInsight
  );
  return updateFormInsight;
};

const createResponseApi = async ({
  answers,
  formId,
  timeStarted,
}: {
  answers: IAnswer[];
  formId: string;
  timeStarted: number | null;
}) => {
  let diff;
  if (timeStarted) {
    const currentTime = new Date();
    diff = (currentTime.getTime() - timeStarted) / 1000;
  }
  const answerResponse = {
    encryptionType: EncryptionType.NONE,
    submissionDate: new Date(),
    noOfQuestionsAnswered: answers.filter(
      (answer) => answer.answeredQuestion === true
    )?.length,
    totalTimeTaken: `${diff}`,
    formId,
    answers,
  };
  const response = await axiosClient.post("/response/create", answerResponse);
  await axiosClient.put(`/form/update/insight/${formId}`, { submitted: 1 });
  return response.data;
};

export {
  getUserInfo,
  updateFormDetails,
  createNewFormApi,
  getUserForms,
  getFormById,
  getFormBySlug,
  createResponseApi,
  updateFormInsightApi,
};
