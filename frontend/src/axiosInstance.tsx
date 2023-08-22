import axios from "axios";

const instance = axios.create({
  baseURL: "https://sweet-delights-56f7be3f8549.herokuapp.com/api/",
  withCredentials: true,
});

export default instance;
