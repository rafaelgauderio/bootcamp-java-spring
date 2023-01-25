import { createContext } from 'react';
import { TokenData } from 'util/auth';


export type AuthContextData = {
  authenticated: boolean;
  tokenData?: TokenData; // tokenData é um parâmetro opcional
};

export type AuthContextType = {
    authContextData: AuthContextData;
    setAuthContextData: (authContextData: AuthContextData) =>  void;
}

// função para criar o contexto global
export const AuthContext = createContext<AuthContextType> ({
    // valor inicial de autenticação é falso 
    authContextData : {
        authenticated: false,
    },
    setAuthContextData: () => null,
});

