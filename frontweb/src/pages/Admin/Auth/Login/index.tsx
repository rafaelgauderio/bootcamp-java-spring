import ButtonIcon from "components/ButtonIcon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { requestBackendLogin } from "util/requests";

import './styles.css';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const [hasLoginError, setHasLoginError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const functionOnSubmit = (formInputData: FormData) => {
        requestBackendLogin(formInputData)
            .then(response => {
                console.log("login com SUCESSO", response);
                setHasLoginError(false);
            })
            .catch(error => {
                console.log("FALHA! Login com ERRO", error);
                setHasLoginError(true);
            });
        //console.log(formInputData);
    };

    return (

        <div className="base-card login-card">
            <h1>LOGAR</h1>
            {hasLoginError && (<div className="alert alert-danger text-center">
                Erro ao tentar realizar Login!
            </div>)}
            <form onSubmit={handleSubmit(functionOnSubmit)}>
                <div className="mb-4">
                    <input
                        {...register("username", {
                            required: "Obrigatório informar o Usuário",
                            minLength: {
                                value: 3,
                                message: "Mínimo de 3 caracteres"
                            },
                            maxLength: {
                                value: 25,
                                message: "Máximo de 25 caracteres"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Informe um email válido"
                            }
                        })}
                        type="text" className="form-control base-input"
                        placeholder="Email" name="username" />
                    <div className="invalid-feedback d-block">{errors.username?.message}</div>
                </div>
                <div className="mb-2">
                    <input
                        {...register('password', {
                            required: "Obrigatório informar a Senha",
                            minLength: {
                                value: 3,
                                message: "Mínimo de 3 caracteres"
                            },
                            maxLength: {
                                value: 15,
                                message: "Máximo de 15 caracteres"
                            }                             
                        })}
                        type="password" className="form-control base-input"
                        placeholder="Senha"
                        name="password" />
                    <div className="invalid-feedback d-block">{errors.password?.message}</div>
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