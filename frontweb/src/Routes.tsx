import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Home/Catalog';

const Rotas = () => (
  <BrowserRouter>
    <NavBar></NavBar>
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/products">
        <Catalog></Catalog>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Rotas;
