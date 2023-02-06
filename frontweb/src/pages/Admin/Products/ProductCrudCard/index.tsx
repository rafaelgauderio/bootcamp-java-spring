import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

type Props = {
  product: Product;
  //adicionando um Prop que é um evento
  onDelete: Function;
};

const ProductCrudCard = ({ product, onDelete }: Props) => {
  // função para deleter um produto
  const handleDelete = (productId: number) => {
    Swal.fire({
      title: '<strong>EXCLUSÃO DE PRODUTO</strong>',
      icon: 'warning',
      html: '<p>Excluir um produto é uma operação que não poderá ser desfeita</p>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up">Confirmar</i> ',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="fa fa-thumbs-down">Cancelar</i>',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        const config: AxiosRequestConfig = {
          method: 'DELETE',
          url: `products/${productId}`,
          withCredentials: true,
        };

        requestBackend(config).then(() => {
          //console.log('Deletando produto por id: ' + productId);
          onDelete(); // após deleter um produto renderiza a tela sem esse produto
          toast.success("Produdo Excluído com sucesso", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          Swal.fire('Excluído', 'Produto excluído com sucesso', 'success');
        });
        
      } else if (resultado.isDenied || resultado.isDismissed) {
        toast.info("Operação cancelada", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,      
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        Swal.fire(
          'Cancelada',
          'Exclusão cancelada. Nada foi alterado no banco de dados',
          'info'
        );
      }
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
