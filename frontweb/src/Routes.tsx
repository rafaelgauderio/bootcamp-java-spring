import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';

const Rotas = () => (
  <BrowserRouter>
    <NavBar></NavBar>
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/products" exact>
        <Catalog></Catalog>
      </Route>
      <Redirect from="/admin" to="/admin/products" exact></Redirect>
      <Route path="/admin">
        <Admin></Admin>
      </Route>      
      <Route path="/products/:productId">
        <ProductDetails></ProductDetails>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Rotas;
