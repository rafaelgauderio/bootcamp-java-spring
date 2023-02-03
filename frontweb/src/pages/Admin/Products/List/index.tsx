import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import './styles.css';
import Pagination from 'components/Pagination';

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  // essência do padrão de projetos observer
  // fazer um componente que permite que permite outros componentes escrevam no evento dele

  //sempre que deleter um produto vai buscar a lista atualiza do backend
  const getProducts = (pageNumber : number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: pageNumber,
        size: 5,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  };

  useEffect(() => {
    getProducts(0);
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
            <ProductCrudCard
              product={produto}
              onDelete={() => {
                getProducts(page.number); //número da página como argumento
              }}
            />
          </div>
        ))}
      </div>

      <Pagination // fazer um if ternário para tratar o caso do page ser undefined
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={getProducts} 
        // apenas um ponteiro (referência da função) não está chamando a função getProducts()
        
      />
    </div>
  );
};

export default List;
