import { IStaticPage } from "../../interfaces/IStaticPage";
import { FormStaticType } from "../../utils/constants";
import FirstPageSheet from "./custom/FirstPageSheet";
import LastPageSheet from "./custom/LastPageSheet";

const CreateFormStaticSheet = ({
  staticSheet,
}: {
  staticSheet: IStaticPage;
}) => {
  return (
    <>
      {staticSheet.formStaticType === FormStaticType.START ? (
        <FirstPageSheet />
      ) : (
        <LastPageSheet />
      )}
    </>
  );
};

export default CreateFormStaticSheet;
