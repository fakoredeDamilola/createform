import { IForm } from "../../../interfaces/IForm";
import { FormStaticType } from "../../../utils/constants";
import ContentStartStaticPage from "./ContentStartStaticPage";
import { IResponseDetail } from "../../../interfaces/IResponseDetail";

const ContentStaticPage = ({
  form,
  contentCurrentStaticPage,
  response,
  updateEncryptionDetails,
}: {
  form: IForm;
  contentCurrentStaticPage: FormStaticType | string;
  response: IResponseDetail;
  updateEncryptionDetails: (inputValues: { [key: string]: string }) => void;
}) => {
  console.log({ form, response }, "uoowowo");

  if (contentCurrentStaticPage === FormStaticType.START) {
    return (
      <ContentStartStaticPage
        staticPage={form.formStartPage}
        encryptionDetails={response.encryptionDetails}
        instructions={form.formStartPage.instructions ?? []}
        updateEncryptionDetails={updateEncryptionDetails}
      />
    );
  }
};

export default ContentStaticPage;
