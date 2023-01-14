import { ReactComponent as AuthLogin } from 'assets/images/auth-login.svg';
import { Route, Switch } from 'react-router-dom';

import './styles.css';

const Auth = () => {

    return (
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Faça login para cadastrar e editar produtos</h1>
                <p>Entre em contato conosco caso deseje ter seus produtos divulgados no nosso catálogo</p>
                <AuthLogin></AuthLogin>
            </div>
            <div className="auth-form-container">
                <Switch>
                    <Route path="/admin/auth/login" exact>
                        <h1>Card de Login</h1>
                    </Route>
                    <Route path="/admin/auth/singup">
                        <h1>Card de Cadastro</h1>
                    </Route>
                    <Route path="/admin/auth/recover">
                        <h1>Card de Recuperar Senha</h1>
                    </Route>
                </Switch>

            </div>
        </div>

    );

}

export default Auth;