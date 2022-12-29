import { ReactComponent as ImagemPrincipal } from 'assets/images/main-image.svg';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Conheça nosso catálogo de produtos</h1>
              <p>Encontre aqui os melhores produtos eletrônicos do mercado</p>
            </div>
            <Link to="/products">
              <ButtonIcon></ButtonIcon>
            </Link>
          </div>
          <div className="home-image-container">
            <ImagemPrincipal></ImagemPrincipal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
