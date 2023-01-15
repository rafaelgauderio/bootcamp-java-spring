import ButtonIcon from "components/ButtonIcon";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import './styles.css';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const functionOnSubmit = (formInputData: FormData) => {
        console.log(formInputData);
    };

    return (

        <div className="base-card login-card">
            <h1>LOGAR</h1>
            <form onSubmit={handleSubmit(functionOnSubmit)}>
                <div className="mb-4">
                    <input
                        {...register("username")}
                        type="text" className="form-control base-input"
                        placeholder="Email" name="username" />                   
                </div>
                <div className="mb-2">
                    <input
                        {...register('password')}
                        type="password" className="form-control base-input"
                        placeholder="Senha"
                        name="password" />                
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
}

export default Login;