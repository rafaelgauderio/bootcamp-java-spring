import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthenticationData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'catalog';

const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'catalog123';

/*
const basicHeaderAuthorization = () => {
    return (
        'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    );
}
*/

type LoginData = {
  username: string;
  password: string;
};


export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
  // no javascript quando a nome da variável e o atributo tem o mesmo nome, é possíve omitir o valor do atributo
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? { ...config.headers,
        Authorization: 'Bearer ' + getAuthenticationData().access_token,
      }
    : { };

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// adicionando um response interceptor antes da requisição
axios.interceptors.request.use(
  function (config) {
    console.log('Interceptor ANTES da requisição');
    return config;
  },
  function (error) {
    console.log('Interceptor ERRO na requisição');
    return Promise.reject(error);
  }
);

// adicionao um response interceptor no resposta da requisição

axios.interceptors.response.use(
  function (response) {
    console.log('Interceptor SUCESSO na resposta');
    return response;
  },
  function (error) {
    // se der erro na resposta
    if (error.response.status === 403 || error.response.status === 401) {
      history.push('/admin/auth/login');
    }
    console.log('Interceptor ERRO na resposta');
    return Promise.reject(error);
  }
);

