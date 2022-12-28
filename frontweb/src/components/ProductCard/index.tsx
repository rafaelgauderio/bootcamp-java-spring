import './styles.css';
import  ProductImg from 'assets/images/product.png';

const ProductCard = () => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={ProductImg} alt="Nome do Produto" />
      </div>
      <div className="card-bottom-container">
        <h5>Nome do Produto</h5>
        <p>R$ 1999,99</p>
      </div>
    </div>
  );
};

export default ProductCard;
