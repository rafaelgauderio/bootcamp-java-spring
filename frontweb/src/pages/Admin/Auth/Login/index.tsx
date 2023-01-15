import ButtonIcon from "components/ButtonIcon";
import { Link } from "react-router-dom";

import './styles.css';



const Login = () => {

    return (

        <div className="base-card login-card">
            <h1>LOGAR</h1>
            <form>
                <div className="mb-4">
                    <input
                        type="text" className="form-control base-input"
                        placeholder="Email" name="username">
                    </input>
                </div>
                <div className="mb-2">
                    <input
                        type="password" className="form-control base-input"
                        placeholder="Senha"
                        name="password">

                    </input>
                    <Link to="/admin/auth/recover" className="login-link-recover">
                        Esqueci minha senha
                    </Link>
                    <div className="Login-submit">
                        <ButtonIcon text="Fazer login" />
                    </div>
                    <div className="singup-container">
                        <span className="not-registered">Faça seu Cadastro. </span>
                        <Link to="/admin/auth/register" className="login-link-register">
                            CADASTRAR
                        </Link>
                    </div>


                </div>
            </form>
        </div>

    );
}

export default Login;