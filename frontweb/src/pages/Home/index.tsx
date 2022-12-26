import { ReactComponent as ImagemPrincipal } from 'assets/images/main-image.svg';
import NavBar from 'components/Navbar';
import ButtonIcon from 'components/ButtonIcon';
import './styles.css';

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-card">
          <div className="home-content-container">
            <div>
            <h1>Conheça nosso catálogo de produtos</h1>
            <p>Encontre aqui os melhores produtos eletrônicos do mercado</p>
            </div>
            <ButtonIcon></ButtonIcon>
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
