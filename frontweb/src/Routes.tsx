import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Home/Catalog';
import Admin from 'pages/Admin';

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
      <Route path="/admin">
        <Admin></Admin>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Rotas;
