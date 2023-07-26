import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5003/api/",
  withCredentials: true,
});

export default instance;
