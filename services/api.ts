import axios from "axios";

/**
 * 格式化返回
 */
axios.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const api = axios;

export default api;
