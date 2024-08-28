import axios, { AxiosInstance } from "axios";
import { getCancelToken } from "../utils/cancel-token.util";

export const getAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "/api",
  });

  instance.interceptors.request.use((config) => {
    if (config.cancelToken === undefined && config.url) {
      config.cancelToken = getCancelToken(config.url);
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.code === "ERR_CANCELED") {
        return Promise.reject({
          code: 499,
          messages: ["Request was cancelled"],
        });
      }

      return Promise.reject(error.response);
    }
  );

  return instance;
};
