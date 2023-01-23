import NavBar from 'components/Navbar';
import Admin from 'pages/Admin';
import Auth from 'pages/Admin/Auth';
import Catalog from 'pages/Catalog';
import Home from 'pages/Home';
import ProductDetails from 'pages/ProductDetails';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import history from 'util/history'

const Rotas = () => (
  <Router history={history}>
    <NavBar></NavBar>
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/products" exact>
        <Catalog></Catalog>
      </Route>
      <Route path="/products/:productId">
        <ProductDetails></ProductDetails>
      </Route>
      <Redirect from="/admin/auth" to="/admin/auth/login" exact></Redirect>
      <Route path="/admin/auth">
        <Auth></Auth>
      </Route>
      <Redirect from="/admin" to="/admin/products" exact></Redirect>
      <Route path="/admin">
        <Admin></Admin>
      </Route>
    </Switch>
  </Router>
);

export default Rotas;
