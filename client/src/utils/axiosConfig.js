import axios from "axios";

// const instance = axios.create({
//   baseURL: "",  // deploy url
//   withCredentials: true,
// });

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  withCredentials: true,
});

export default instance;