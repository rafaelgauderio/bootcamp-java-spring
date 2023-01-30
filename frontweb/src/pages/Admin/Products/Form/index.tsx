import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-card-title">CADASTRAR PRODUTO</h1>
        <form action="">
          <div className="row">
            <div className="col-lg-6">
              <input type="text" className="base-input form-control"></input>
              <input type="text" className="base-input form-control"></input>
              <input type="text" className="base-input form-control"></input>
              <input type="text" className="base-input form-control"></input>              
            </div>
            <div className="col-lg-6">
              <textarea className="base-input form-control" name="" id="" cols={25} rows={20}></textarea>
            </div>
          </div>
          <div>
            <button className="btn btn-outline-danger">CANCELAR</button>
            <button className="btn btn-outline-primary">SALVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
