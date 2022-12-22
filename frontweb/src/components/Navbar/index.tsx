import './styles.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-primary main-nav">
      <div className="container-fluid">
        <a href="link" className="nav-logo-text">
          <h4>Catálogo de Produtos</h4>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <a href="link" className="active">HOME</a>
            </li>
            <li>
              <a href="link">CATÁLOGO</a>
            </li>
            <li>
              <a href="link">PAINEL DO ADMIN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
