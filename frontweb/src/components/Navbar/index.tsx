import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/src/collapse';
import history from 'util/history';

import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'AuthContext';
import { isUserAuthenticated } from 'util/auth';
import { removeAuthenticationData } from 'util/storage';
import { getTokenData } from 'util/token';

const NavBar = () => {
  // referência apontada para o contexto global
  // tenho nos argumentos o estado e função para alterar o estado
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  //const [authData, setAuthData] = useState<AuthData>({ authenticated: false });

  // useEffect tem 2 argumentos
  useEffect(() => {
    if (isUserAuthenticated() === true) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleClickLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Não haver a navegação no link.
    removeAuthenticationData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>Catálogo Online</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#catalogo-navbar"
          aria-controls="catalogo-navbar"
          aria-expanded="false"
          arial-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="catalogo-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                PAINEL DO ADMIN
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-user-email">
                {authContextData.tokenData?.user_name}
              </span>
              <div className="link-logout">
                <a href="#logout" onClick={handleClickLogout}>
                  SAIR
                </a>
              </div>
            </>
          ) : (
            <div className="link-login">
              <Link to="/admin/auth/login">LOGIN</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
