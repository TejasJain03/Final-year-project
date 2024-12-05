import { useSearchParams } from "react-router-dom";
import FormComponent from "./TemplateForms/FormComponent";
import FormComponentGoogle from "./TemplateForms/FormComponentGoogle";
import FormComponentCollege from "./TemplateForms/FormComponentCollege";
import FormComponentMBA from "./TemplateForms/FormComponentMBA";

const TEMPLATE_FORMS = {
  1: <FormComponent />,
  2: <FormComponentGoogle />,
  3: <FormComponentCollege />,
  4: <FormComponentMBA />,
};

const FormPage = () => {
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template");

  return (
    <>
      {template<=4?(
        <>
          <div className="mx-auto my-10 font-bold text-xl">
            Fill the form accordingly. Refer the format as specified in the
            fields.
          </div>
          {TEMPLATE_FORMS[template]}
        </>
      ): <p className="mx-auto text-2xl font-extrabold my-10">No template selected or invalid template number.</p>}
    </>
  );
};

export default FormPage;
