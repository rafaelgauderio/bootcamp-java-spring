import { ReactComponent as ImagemPrincipal } from 'assets/images/main-image.svg';
import NavBar from 'components/Navbar';

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-card">
          <div className="home-content-container">
          <h1>Conheça nosso catálogo de produto</h1>
          </div>
          <div className="home-image-container"></div>
              <ImagemPrincipal></ImagemPrincipal>
        </div>
      </div>
      
    </>
  );
};

export default Home;
