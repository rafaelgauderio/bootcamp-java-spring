import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import NavBar from 'components/Navbar';
import Home from 'pages/Home';


const Rotas = () =>  (

    <BrowserRouter>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
      </Switch>
    </BrowserRouter>
  
);

export default Rotas;
