import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';

type Props = {
  product : Product;
}

const ProductCrudCard = ( {product} : Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="card-top-container">
        <img src={product.imgURL} alt={product.name} />
      </div>
      <div className="card-bottom-container">
        <h5>{product.name}</h5>
        <p><ProductPrice price={product.price} ></ProductPrice></p>
      </div>
    </div>
  );
};

export default ProductCrudCard;
