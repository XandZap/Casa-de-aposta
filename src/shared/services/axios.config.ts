import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const isToken = false;

    if (isToken) {
      config.headers!.Authorization = "Bearer " + isToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error: AxiosError) {
    if (error.response) {
      const handleError = error.response;
      return Promise.reject(handleError);
    }
    return Promise.reject(error);
  }
);

export default instance;
