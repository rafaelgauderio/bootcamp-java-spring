import { Switch, Route } from 'react-router-dom';
import NavBar from './Navbar';
import './styles.css';
import Users from './User';

const Admin = () => {
  return (
    <div className="admin-container">
      <NavBar></NavBar>
      <div className="admin-content">
        <Switch>
          <Route path="/admin/products">
            <h1>CRUD dos Produtos</h1>
          </Route>
          <Route path="/admin/categories">
            <h1>CRUD dos Categorias</h1>
          </Route>
          <Route path="/admin/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
