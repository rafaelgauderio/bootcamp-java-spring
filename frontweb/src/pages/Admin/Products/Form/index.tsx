import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import Swal from 'sweetalert2';
import './styles.css';
import Select from 'react-select';
import { Category } from 'types/category';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';

type UrlParams = {
  productId: string;
};

const Form = () => {
  // lista de categorias vindo do backend, iniciando com lista vazia
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { productId } = useParams<UrlParams>();

  // variável booleana para ver se está inserindo(create) ou se está editando(productId) de acordo com o parâmetro da rota
  const isEditing = productId !== 'create';

  const {
    register, // configurar o formulario para receber os parametros register e errors
    handleSubmit, // o que fazer ao clicar em salvar um produto novo
    formState: { errors },
    setValue,
    control, // objeto de controlle de uso interno do useForm
  } = useForm<Product>();

  //useEffect para buscar da backend as categorias e armazenar no useState de selectCategories
  // é possível ter mais de um userEffect por componente
  // useEffect tem 2 parãmetros, uma função para setar o estado e uma lista de dependências
  useEffect(() => {
    requestBackend({ url: '/categories' }).then((resposta) => {
      setSelectCategories(resposta.data.content); //como retorna uma lista paginada precisa pegar o content da lista
    });
  }, []);

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

  // função para editar ou inserir um produto novo
  const onSubmit = (formData: Product) => {
    // passando um lista de categoria hardCore temporariamente
    // passando o link da imagem hardcore

    const data = {
      ...formData, price: String(formData.price).replace(",", ".")

    }
    
    Swal.fire({
      title: '<strong>INSERÇÃO/EDIÇÃO DE PRODUTO</strong>',
      icon: 'question',
      html: '<p>Confirma a inserção/edição do produto</p>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up">Confirmar</i> ',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="fa fa-thumbs-down">Cancelar</i>',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((resultado) => {
      if (resultado.isConfirmed === true) {
        const config: AxiosRequestConfig = {
          // testar se método está Editando(PUT) ou salvando(POST)
          method: isEditing ? 'PUT' : 'POST',
          // se estiver editando pega o ID do produto, senão o JPA cria um novo Id
          url: isEditing ? `/products/${productId}` : '/products',
          data: data,
          withCredentials: true, //necessário estar autenticado para fazer um POST de um produto novo
        };

        requestBackend(config).then((resposta) => {
          // detro do then só executa se tiver resposta sucess (200) do backend
          // após salvar direcinar para a rota de produtos

          Swal.fire(
            'SUCESSO',
            'Produto criado ou editado com sucesso',
            'success'
          );

          toast.success("Produto criado ou editado com sucesso", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          history.push('/admin/products');

        })
          .catch(() => {
            toast.error("Erro ao tentar cadastrar produto!");
          });


      } else if (resultado.dismiss || resultado.isDenied) {
        handleCancelar();
      }
    });
  };

  const handleCancelar = () => {
    toast.info("Operação cancelada", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    Swal.fire(
      'Cancelada',
      'Operação cancelada. Nada foi alterado no banco de dados',
      'info'
    );
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
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''
                    }`}
                  placeholder="Nome do Produto"
                  name="name"
                  data-testid="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-botton-25px">
                <label htmlFor="categories" className="d-none">Categorias do Produto</label>
                <Controller
                  name="categories"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      isMulti={true}
                      classNamePrefix="product-crud-select"
                      placeholder="Categorias do Produto"
                      getOptionLabel={(categoria: Category) => categoria.name}
                      getOptionValue={(categoria: Category) =>
                        String(categoria.id)
                      }
                      inputId="categories"
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    <p>Campo Obrigatório</p>
                  </div>
                )}
              </div>

              <div className="margin-botton-25px">
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: 'Campo obrigatório' }}
                  render={({ field }) => (
                    <CurrencyInput
                      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                      placeholder="Preço Unitário"
                      className={`form-control base-input ${errors.name ? 'is-invalid' : ''
                        }`}

                      decimalsLimit={2}
                      maxLength={15}
                      disableGroupSeparators={true}
                      allowNegativeValue={false}
                      decimalSeparator={"," || "."}
                      value={field.value}
                      onValueChange={field.onChange}
                      data-testid="price"
                    />
                  )}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-botton-25px">
                <input
                  {...register('imgURL', {
                    required: 'Campo obrigatório ',
                    minLength: {
                      value: 3,
                      message: 'Mínimo de 3 caracteres',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Máximo de 100 caracteres',
                    },
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Url inválida. Favor informar um link válido.',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''
                    }`}
                  placeholder="Link da imagem do Produto"
                  name="imgURL"
                  data-testid="imgURL"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgURL?.message}
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
                  className={`base-input form-control h-auto ${errors.name ? 'is-invalid' : ''
                    }`}
                  name="description"
                  id=""
                  placeholder="Descrição do Produto"
                  data-testid="description"
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
