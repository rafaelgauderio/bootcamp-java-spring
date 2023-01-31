import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  // variável booleana para ver se está inserindo(create) ou se está editando(productId) de acordo com o parâmetro da rota
  const isEditing = productId !== 'create';

  const {
    register, // configurar o formulario para receber os parametros register e errors
    handleSubmit, // o que fazer ao clicar em salvar um produto novo
    formState: { errors },
    setValue,
  } = useForm<Product>();
  //fazendo um requisição não autenticada
  useEffect(() => {
    if (isEditing === true) {
      requestBackend({
        url: `/products/${productId}`,
      }).then((resposta) => {
        const product = resposta.data as Product; // fazendo o casting para não ter problema de tipagem
        // setando os novos valores
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('imgURL', product.imgURL);
        setValue('description', product.description);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const history = useHistory();

  const onSubmit = (formData: Product) => {
    // passando um lista de categoria hardCore temporariamente
    // passando o link da imagem hardcore
    const data = {
      ...formData,
      imgURL: isEditing
        ? formData.imgURL //só vai inserir a ImgUrl abaixo senão estiver editando
        : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: isEditing
        ? formData.categories
        : [{ id: 1, name: 'Categoria Teste' }],
    };

    const config: AxiosRequestConfig = {
      // testar se método está Editando(PUT) ou salvando(POST)
      method: isEditing ? 'PUT' : 'POST',
      // se estiver editando pega o ID do produto, senão o JPA cria um novo Id
      url: isEditing ? `/products/${productId}` : '/products',
      data: data,
      withCredentials: true, //necessário estar autenticado para fazer um POST de um produto novo
    };

    requestBackend(config).then((resposta) => {
      // após salvar direcinar para a rota de produtos
      history.push('/admin/products');
    });
  };

  const handleCancelar = () => {
    // vai levar para um rota progamaticamente, volta para a rora de produtos se cancelar a criação de produto
    history.push('/admin/products');
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
                <input
                  {...register('price', {
                    required: 'Campo obrigatório ',
                    minLength: {
                      value: 2,
                      message: 'Mínimo de 1 caracteres',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Máximo de 10 caracteres',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço unitário"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  cols={25}
                  rows={15}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`base-input form-control h-auto ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  name="description"
                  id=""
                  placeholder="Descrição do Produto"
                ></textarea>
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              onClick={handleCancelar}
              className="btn btn-outline-danger product-crud-button"
            >
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
