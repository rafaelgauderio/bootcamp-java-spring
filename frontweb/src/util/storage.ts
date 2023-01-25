const tokenKey = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
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
