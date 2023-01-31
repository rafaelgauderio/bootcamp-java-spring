import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
  product: Product;
  //adicionando um Prop que é um evento
  onDelete : Function;
};

const ProductCrudCard = ({ product, onDelete }: Props) => {
  // função para deleter um produto
  const handleDelete = (productId: number) => {
    if (
      window.confirm('Confirma exclusão do Produto ' + product.name) ===
      false
    ) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `products/${productId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      //console.log('Deletando produto por id: ' + productId);
      onDelete(); // após deleter um produto rendezi a tela sem esse produto
    });
  };

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgURL} alt={product.name} />
      </div>
      <div className="product-crud-card-description">
        <div className="product-crud-card-bottom-container">
          <h5>{product.name}</h5>
          <p>
            <ProductPrice price={product.price}></ProductPrice>
          </p>
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((categoria) => (
            <CategoryBadge name={categoria.name} key={categoria.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(product.id)}
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-delete"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-warning product-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;
