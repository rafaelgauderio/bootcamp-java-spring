import './styles.css';

const ProductFilter = () => {
  return (
    <div className="base-card search-bar-product-filter">
      <form action="" className="product-filter-form">
        <div className="product-filter-name-container">
          <input type="text" className="form-control"></input>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <select name="" id="">
              <option value="">Categoria 01</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">Limpar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
