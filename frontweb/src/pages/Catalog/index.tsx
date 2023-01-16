import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { BASE_URL } from 'util/requests';
import CardLoader from './CardLoader';
import axios, { AxiosRequestConfig } from 'axios';


import './styles.css';


const Catalog = () => {
  /* objeto catalogo mockado
  const product: Product = {
    id: 25,
    name: 'PC Gamer Foo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 4170.0,
    imgURL:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/25-big.jpg',
    date: '2020-07-14T10:00:00Z',
    categories: [
      {
        id: 3,
        name: 'Computadores',
      },
    ],
  };
  */

  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect tem 2 argumentos: a função dentro das chaves e as dependências dentro dos colchetes
  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      baseURL: BASE_URL,
      url: "/products",
      params: {
        page: 0,
        size: 12,
      }
    };

    // finally executa uma função depois de resolver uma promisse
    // catch executa uma função caso der erro na resolução da promisse
    setIsLoading(true);
    axios(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de Produtos</h1>
      </div>
      <div className="row">
        {isLoading ? 
          <CardLoader></CardLoader>
         : (
          page?.content.map((produto) => {
            return (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={produto.id}>
                <Link to="/products/1">
                  <ProductCard product={produto}></ProductCard>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className="row">
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default Catalog;
