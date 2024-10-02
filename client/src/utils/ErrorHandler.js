/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ErrroHandler = (func) => {
  const navigate = Navigate();
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      const message = error.response.data.message,
        type = "error";
      toast(message);
      if (error.response.data.status === "logout") {
        localStorage.removeItem("authenticate");
        navigate("/auth");  // might have to change this
      }
    });
  };
};

export default ErrroHandler;
