import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css';

const Form = () => {
  const {
    register, // configurar o formulario para receber os parametros register e errors
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data: formData,
      withCredentials: true, //necessário estar autenticado para fazer um POST de um produto novo
    };

    requestBackend(config).then((resposta) => {
      console.log(resposta.data);
    });
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-card-title">CADASTRAR PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-botton-25px">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório ',
                    minLength: {
                      value: 3,
                      message: 'Mínimo de 3 caracteres',
                    },
                    maxLength: {
                      value: 25,
                      message: 'Máximo de 25 caracteres',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do Produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-botton-25px">
                <input type="text" className="base-input form-control"></input>
              </div>

              <div>
                <input type="text" className="base-input form-control"></input>
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                className="base-input form-control h-auto"
                name=""
                id=""
                cols={25}
                rows={15}
              ></textarea>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button className="btn btn-outline-danger product-crud-button">
              CANCELAR
            </button>
            <button className="btn btn-primary text-white product-crud-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
