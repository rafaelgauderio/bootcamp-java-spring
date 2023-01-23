import PrivateRoute from 'components/PrivateRoute/indext';
import { Switch } from 'react-router-dom';
import NavBar from './Navbar';
import './styles.css';
import Users from './User';

const Admin = () => {
  return (
    <div className="admin-container">
      <NavBar></NavBar>
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/products">
            <h1>CRUD dos Produtos</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/categories">
            <h1>CRUD dos Categorias</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users">
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
