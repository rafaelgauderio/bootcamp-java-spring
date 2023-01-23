import { ReactComponent as ImagemPrincipal } from 'assets/images/main-image.svg';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import { getTokenData, isUserAuthenticated } from 'util/requests';
import './styles.css';

const Tests = () => {
  return (
    <>
      <div className="home-container">
        <h3>{getTokenData()?.user_name}</h3>
        <h3>
          {isUserAuthenticated()
            ? 'Usuário autenticado'
            : 'Usuário NÃO autenticado'}
        </h3>
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Conheça nosso catálogo de produtos</h1>
              <p>Encontre aqui os melhores produtos eletrônicos do mercado</p>
            </div>
            <div>
              <Link to="/products">
                <ButtonIcon text="Buscar Produtos Agora"></ButtonIcon>
              </Link>
            </div>
          </div>
          <div className="home-image-container">
            <ImagemPrincipal></ImagemPrincipal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tests;
