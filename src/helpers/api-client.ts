import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import  {store}  from "../store/store";
import { DataBaseUrl } from "../constants/base-url";

// Defining Axios defaults
axios.defaults.baseURL = DataBaseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

// const state = store.getState();
// const accessToken = state.user.accessToken;

// Intercepting requests to add the Authorization header
axios.interceptors.request.use(
  (config: any) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    console.log(accessToken);
    
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

// Function to set Authorization header
const setAuthorization = (accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Intercepting to capture errors and handle token refresh
axios.interceptors.response.use(
  (response: AxiosResponse) => response?.data,
  async (error:any) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      toast.warning("Session timed out, please login and try again", { autoClose: 2000 });
      localStorage.clear();
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

class APIClient {
  get = (url: string, params?: Record<string, any>): Promise<AxiosResponse<any>> => {
    const queryString = params
      ? Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")
      : "";
    return axios.get(`${url}${queryString ? `?${queryString}` : ""}`);
  };

  create = async (url: string, data: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error:any) {
      console.error("API Client Create Error:", error?.response.data.Message);
      throw new Error(error?.response.data.Message);
    }
  };

  update = (url: string, data: any): Promise<AxiosResponse<any>> => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any): Promise<AxiosResponse<any>> => {
    return axios.put(url, data);
  };

  patch = (url: string, data: any): Promise<AxiosResponse<any>> => {
    return axios.patch(url, data);
  };

  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    return axios.delete(url, config);
  };
}

export { APIClient, setAuthorization };
