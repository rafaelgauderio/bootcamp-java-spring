import { Role } from "types/role";
import { getTokenData } from "./token";

export const isUserAuthenticated = (): boolean => {
  const tokenData = getTokenData();

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


