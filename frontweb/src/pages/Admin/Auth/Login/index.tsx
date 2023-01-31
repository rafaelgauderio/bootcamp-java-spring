import { AuthContext } from 'AuthContext';
import ButtonIcon from 'components/ButtonIcon';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getTokenData } from 'util/auth';
import { requestBackendLogin } from 'util/requests';
import { saveAuthenticationData } from 'util/storage';

import './styles.css';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/admin' } };

  const { setAuthContextData } = useContext(AuthContext);

  const [hasLoginError, setHasLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsDTO>();
  // para fazer mudanças de rotas progamaticamente

  const historyLogin = useHistory();

  const functionOnSubmit = (formInputData: CredentialsDTO) => {
    requestBackendLogin(formInputData)
      .then((response) => {
        //console.log("login com SUCESSO", response);
        setHasLoginError(false);
        saveAuthenticationData(response.data); // argumento é o corpo da resposta
        //const token = getAuthenticationData().access_token;
        //console.log("Generated token: "+ token);
        // alterando o contexto e o componente ao fazer login
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        // push empilha uma nova rota, replace substitui a rota de login (redirecionada antes de logar) para a rota anterior
        historyLogin.replace(from); // vai voltar para a pagina protegida que estava tentando acessar antes de logar
      })
      .catch((error) => {
        console.log('FALHA! Login com ERRO', error);
        setHasLoginError(true);
      });
    //console.log(formInputData);
  };

  return (
    <div className="base-card login-card">
      <h1>LOGAR</h1>
      {hasLoginError && (
        <div className="alert alert-danger text-center">
          Erro ao tentar realizar Login!<br></br>  
          Usuário ou senha inválidos                  
       </div>
      )}
      <form onSubmit={handleSubmit(functionOnSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Obrigatório informar o Email',
              minLength: {
                value: 3,
                message: 'Mínimo de 3 caracteres',
              },
              maxLength: {
                value: 25,
                message: 'Máximo de 25 caracteres',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Informe um email válido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Obrigatório informar a Senha',
              minLength: {
                value: 3,
                message: 'Mínimo de 3 caracteres',
              },
              maxLength: {
                value: 15,
                message: 'Máximo de 15 caracteres',
              },
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci minha senha?
        </Link>
        <div className="Login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="singup-container">
          <span className="not-registered">Faça seu Cadastro. </span>
          <Link to="/admin/auth/singup" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
