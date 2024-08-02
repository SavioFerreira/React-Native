import axios, {AxiosInstance} from "axios";

import { AppError } from "@utils/AppError";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: 'http://192.168.100.68:3333',
  timeout: 3000,
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, requestError => {
    if(requestError?.response?.status === 401){
      if(requestError.response.data?.message === 'token-expired' || requestError.response.data?.message === 'token-invalid') {

      }
      signOut();
    }
    
    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  }
);
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };

}



api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api }; 