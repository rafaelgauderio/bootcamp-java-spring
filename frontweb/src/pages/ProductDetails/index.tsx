import { ReactComponent as ArrowIcon} from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';

const ProductDetails = () => {
    
    return (
        <div className="product-details-container">
            <div className="product-details-card">
                <div className="goback-container">
                    <ArrowIcon></ArrowIcon>
                    <h2>Voltar</h2>
                </div>
                <div className="row">
                    <div className="cl-xl-6">
                        <div className="img-container">
                            <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/25-big.jpg" alt="nome do produto"/>
                        </div>
                        <div className="name-price-container">
                            <h1>Nome do Produto</h1>
                            <ProductPrice price={1234.56}></ProductPrice>
                        </div>
                    </div>
                    <div className="cl-xl-6">
                        <div className="description-container">
                            <h2>Descrição detalhada do Produto</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid consequuntur magnam provident veritatis? Earum rerum enim sunt recusandae fugiat aut, consequuntur laudantium quibusdam minima non sapiente natus quas laborum facere sint, aspernatur officia? Pariatur ex recusandae harum dolorem consectetur sed perferendis vero? Amet obcaecati incidunt sed atque. Facilis, debitis aperiam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;