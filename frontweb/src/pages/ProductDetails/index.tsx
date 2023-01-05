import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';

import './styles.css';

const ProductDetails = () => {

  // forma errada de fazer
  let product : Product;

  // forma incorreta
  axios.get(BASE_URL + "/products/25")
    .then( response => {
        console.log(response.data)
    });

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
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/25-big.jpg"
                alt="nome do produto"
              />
            </div>
            <div className="name-price-container">
              <h1>Nome do Produto</h1>
              <ProductPrice price={1234.56}></ProductPrice>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição detalhada do Produto</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquid consequuntur magnam provident veritatis? Earum rerum
                enim sunt recusandae fugiat aut.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
