import jwtDecode from "jwt-decode";
import { Role } from "types/role";
import { getAuthenticationData } from "./storage";

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