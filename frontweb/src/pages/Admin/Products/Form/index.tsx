import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-card-title">CADASTRAR PRODUTO</h1>
        <form action="">
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-botton-25px">
                <input type="text" className="base-input form-control"></input>
              </div>
              <div className="margin-botton-25px">
                <input type="text" className="base-input form-control"></input>
              </div>

              <div>
                <input type="text" className="base-input form-control"></input>
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                className="base-input form-control h-auto"
                name=""
                id=""
                cols={25}
                rows={15}
              ></textarea>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button className="btn btn-outline-danger product-crud-button">
              CANCELAR
            </button>
            <button className="btn btn-primary text-white product-crud-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
