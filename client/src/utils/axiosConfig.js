import axios from "axios";

// const instance = axios.create({
//   baseURL: "",  // deploy url
//   withCredentials: true,
// });

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default instance;