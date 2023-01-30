import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import './styles.css';

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 0,
        size: 30,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="product-crud-container">
      <div className="product-crud-search-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            Adicionar Novo
          </button>
        </Link>
        <div className="base-card search-bar-product-filter">
          Barra de Busca
        </div>
      </div>
      <div className="row">
        {page?.content.map((produto) => (
          <div key={produto.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={produto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
