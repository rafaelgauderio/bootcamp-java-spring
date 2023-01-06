import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';
import ProductDetailsLoader from './ProductDetailsLoader';
import ProductInfoLoader from './ProductInfoLoader';

import './styles.css';

type UrlParams = {
  productId: string;
};

const ProductDetails = () => {
  // caputurar os parametros de Urls passados
  const { productId } = useParams<UrlParams>();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect para chamar o objeto apenas uma vez
  // useEffect receber 2 argumentos (função, listaDeDependecias)
  useEffect(() => {
    setIsLoading(true);
    //axios.get(`${BASE_URL}/products/${productId}`)
    axios
      .get(BASE_URL + '/products/' + productId)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

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
            {isLoading ? (
              <ProductInfoLoader></ProductInfoLoader>
            ) : (
              <>
                <div className="img-container">
                  <img src={product?.imgURL} alt={product?.name} />
                </div>
                <div className="name-price-container">
                  <h1>{product?.name}</h1>
                  {product && (
                    <ProductPrice price={product?.price}></ProductPrice>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <ProductDetailsLoader></ProductDetailsLoader>
            ) : (
              <div className="description-container">
                <h2>Descrição detalhada do Produto</h2>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
