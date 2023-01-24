import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

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

const tokenKey = 'authData';

type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

export type TokenData = {
  exp: number;
  user_name: string;
  authorites: Role[];
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
    ? {
        Authorization: 'Bearer ' + getAuthenticationData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

export const saveAuthenticationData = (object: LoginResponse) => {
  // no Local storage consigo apenas salvar string.
  // tanto no campo key como no value
  // stringify() para converter Json para string
  localStorage.setItem('authData', JSON.stringify(object));
};

export const removeAuthenticationData = () => {
  localStorage.removeItem(tokenKey);
};

export const getAuthenticationData = () => {
  // operador de coalescência para garantir que objeto tokenKey não vai ser nulo
  // objeto vazio entre aspas duplas para converter para string
  let strindData = localStorage.getItem(tokenKey) ?? '{}';
  // converter a string para objeto
  let objectData = JSON.parse(strindData);
  // type safety para garantir que retorna uma dado do tipo LoginResponse
  return objectData as LoginResponse;
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

export const getTokenData = (): TokenData | undefined => {
  const loginResponse = getAuthenticationData();
  // token pode não existir ou ser inválido
  try {
    return jwtDecode(loginResponse.access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isUserAuthenticated = (): boolean => {
  var tokenData = getTokenData();

  // testar se é menor que uma data futura para ver se não expirou o token
  // Date do javaScript está em milisegundos e o do Jwt em segundos
  const now = Date.now() / 1000;
  return tokenData && tokenData.exp > now ? true : false;
};

// função para ver se o usuário tem determinada regra de acesso no seu profile
export const hasSomeRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }
  const tokenData = getTokenData();
  
  if (tokenData !== undefined ) {
    return roles.some(role => tokenData.authorites.includes(role));
  } 
  
  return false;
};
