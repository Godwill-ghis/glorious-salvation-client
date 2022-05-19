import axios from "axios";
import { refreshRoute } from "./apiRoutes";
let currentUser = JSON.parse(localStorage.getItem("user"));
let isLog = false;

const Axios = axios.create({
  baseURL: "https://glorious-salvation.herokuapp.com",
  headers: {
    Authorization: `Bearer ${currentUser?.accessToken}`,
  },
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const initialRequest = error?.response?.config;
    const status = error?.response ? error?.response?.status : null;
    if (status === 401) {
      if (!isLog) {
        isLog = true;
        return Axios.post(refreshRoute)
          .then(({ data }) => {
            currentUser = JSON.parse(localStorage.getItem("user"));
            currentUser.accessToken = data.accessToken;
            localStorage.setItem("user", JSON.stringify(currentUser));

            Axios(initialRequest);
          })
          .catch((err) => {
            localStorage.removeItem("user");
            window.location.replace("/login");
            return;
          })
          .finally((isLog = false));
      }
    }
    return Promise.resject(error);
  }
);

export default Axios;
