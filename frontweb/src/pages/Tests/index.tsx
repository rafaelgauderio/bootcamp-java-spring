import { ReactComponent as ImagemPrincipal } from 'assets/images/main-image.svg';
import ButtonIcon from 'components/ButtonIcon';
import TestChildren from 'components/TestChildren';
import { Link } from 'react-router-dom';
import { hasSomeRoles, isUserAuthenticated } from 'util/auth';
import { getTokenData } from 'util/token';
import './styles.css';

const Tests = () => {
  return (
    <>
      <div className="home-container">
        <h1>Página para testar novos componentes</h1>
        <hr />
        <TestChildren weight={74.9}>
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            officia!
          </h5>
          <h5>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae nam
            officia maxime illum optio quia?
          </h5>
        </TestChildren>
        <hr />
        <h3>{getTokenData()?.user_name}</h3>
        <h3>
          {isUserAuthenticated()
            ? 'Usuário autenticado'
            : 'Usuário NÃO autenticado'}
        </h3>
        <hr />
        <h4>
          Resultado se tem regras no perfil =
          {hasSomeRoles(['ROLE_ADMIN', 'ROLE_OPERATOR']) ? 'Sim' : 'Não'}
        </h4>
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
