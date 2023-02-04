import './styles.css';

import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { Category } from 'types/category';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {

  // estado que armazena uma lista de categorias buscandas do backend
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    console.log('REQUISIÇÃO ENVIADA', formData);
  };

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((resposta) => {
      setSelectCategories(resposta.data.content);
    });
  }, []);

  return (
    <div className="base-card search-bar-product-filter">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do Produto"
          />
          <button className="product-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  classNamePrefix="product-filter-select"
                  placeholder="Categoria"
                  isClearable={true}
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary btn-product-filter-clear">Limpar <span className="btn-product-filter-search">Busca</span></button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
