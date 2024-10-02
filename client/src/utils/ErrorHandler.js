/* eslint-disable no-unused-vars */
import {toast} from 'react-toastify';

  const ErrroHandler = (func) => {
    return (req, res, next) => {
      func(req, res, next).catch((error) => {
        const message = error.response.data.message,
          type = "error";
          toast(message);
      });
    };
  };

  export default ErrroHandler;