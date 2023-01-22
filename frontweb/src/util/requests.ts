import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'catalog';

const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'catalog123';

const basicHeaderAuthorization = () => {
    return (
        'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    );
}

const tokenKey = 'authData';

type LoginData = {
    username: string;
    password: string;
}

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export const requestBackendLogin = (loginData: LoginData) => {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    }

    const data = qs.stringify({
        ...loginData,
        grant_type: "password"
    });

    return axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/oauth/token',
        data, headers
    });
    // no javascript quando a nome da variável e o atributo tem o mesmo nome, é possíve omitir o valor do atributo
}

export const requestBackend = (config: AxiosRequestConfig) => {

    const headers = config.withCredentials ?
        {
            Authorization: 'Bearer ' + getAuthenticationData().access_token,
        } : config.headers;

    return axios({ ...config, baseURL: BASE_URL, headers });
};

export const saveAuthenticationData = (object: LoginResponse) => {
    // no Local storage consigo apenas salvar string. 
    // tanto no campo key como no value
    // stringify() para converter Json para string
    localStorage.setItem('authData', JSON.stringify(object));
};

export const getAuthenticationData = () => {
    // operador de coalescência para garantir que objeto tokenKey não vai ser nulo
    // objeto vazio entre aspas duplas para converter para string 
    let strindData = localStorage.getItem(tokenKey) ?? "{}";
    // converter a string para objeto
    let objectData = JSON.parse(strindData);
    // type safety para garantir que retorna uma dado do tipo LoginResponse
    return objectData as LoginResponse;
}

// adicionando um response interceptor antes da requisição
axios.interceptors.request.use(function (config) {
    console.log("Interceptor ANTES da requisição");
    return config;
}, function (error) {
    console.log("Interceptor ERRO na requisição");
    return Promise.reject(error);
});

// adicionao um response interceptor no resposta da requisição

axios.interceptors.response.use(function (response) {
    console.log("Interceptor SUCESSO na resposta");
    return response;
}, function (error) {
    console.log("Interceptor ERRO na resposta");
    return Promise.reject(error);
}
);








