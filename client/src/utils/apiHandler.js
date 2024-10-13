import { toast } from "react-toastify";

const apiHandler = (func, navigate) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      const message = error.response.data.message;
      toast.error(message);
      if (error.response.data.status === "logout") {
        localStorage.removeItem("authenticate");
        navigate("/auth");  // might have to change this
      }
    });
  };
};

export default apiHandler;

// function call
// apiHandler(registerApiCall, navigate)();
// where registerApiCall is the function that consists of the api call
