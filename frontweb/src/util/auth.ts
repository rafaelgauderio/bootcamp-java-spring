import jwtDecode from "jwt-decode";
import { getAuthenticationData } from "./storage";



export type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

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
    
    if (tokenData !== undefined) {
        for (var i = 0; i < roles.length; i++) {
          if (tokenData.authorities.includes(roles[i])) {
            return true;
          }
        }
        //return roles.some(role => tokenData.authorities.includes(role));
      }
    
    
    return false;
  };
  

