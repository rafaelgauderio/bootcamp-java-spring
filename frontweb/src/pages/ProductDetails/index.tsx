import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';

import './styles.css';

const ProductDetails = () => {

  const [product, setProduct] = useState<Product>();

  // useEffect para chamar o objeto apenas uma vez
  // useEffect receber 2 argumentos (função, listaDeDependecias)
  useEffect( () => {
    axios.get(BASE_URL + "/products/1")
      .then( response => {
        setProduct(response.data)
      });
  }, []);

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="goback-container">
          <ArrowIcon></ArrowIcon>
          <Link to="/products">
            <h3>VOLTAR</h3>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src={product?.imgURL}
                alt={product?.name}
              />
            </div>
            <div className="name-price-container">
              <h1>{product?.name}</h1>
              {product && <ProductPrice price={product?.price}></ProductPrice>}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição detalhada do Produto</h2>
              <p>
               {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
