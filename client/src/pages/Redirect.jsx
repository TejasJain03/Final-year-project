/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import "../styles/Redirect.css";

const Redirect = () => {
  const navigate = useNavigate();
  const returnHome = () => navigate("/");
  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header px-2" data-text="404">
          404
        </h2>
        <h4 className="px-2" data-text="Opps! Page not found">
          Oops! Page not found
        </h4>
        <p className="px-2 text-black">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <div className="btns">
          <p onClick={returnHome}>return home</p>
        </div>
      </div>
    </div>
  );
};

export default Redirect;