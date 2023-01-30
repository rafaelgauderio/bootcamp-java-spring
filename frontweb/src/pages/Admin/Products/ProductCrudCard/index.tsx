import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

type Props = {
  product: Product;
}

const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgURL} alt={product.name} />
      </div>
      <div className="product-crud-card-description">
        <div className="product-crud-card-bottom-container">
          <h5>{product.name}</h5>
          <p><ProductPrice price={product.price} ></ProductPrice></p>
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map(categoria =>
          (<CategoryBadge name={categoria.name} key={categoria.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button className="btn btn-outline-danger product-crud-card-button product-crud-card-button-delete">
          EXCLUIR
        </button>
        <button className="btn btn-outline-warning product-crud-card-button">
          EDITAR
        </button>
      </div>
    </div>
  );
};

export default ProductCrudCard;
