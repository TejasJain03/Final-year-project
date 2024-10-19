import { useSearchParams } from "react-router-dom";
import FormComponent from "./TemplateForms/FormComponent";
import FormComponentGoogle from "./TemplateForms/FormComponentGoogle";

const TEMPLATE_FORMS = {
  1: <FormComponent />,
  2: <FormComponentGoogle />
};

const FormPage = () => {
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template");

  return (
    <>
      {TEMPLATE_FORMS[template] || <p>No template selected or invalid template number.</p>}
    </>
  );
};

export default FormPage;
