import { Switch } from 'react-router-dom';
import NavBar from './Navbar';
import './styles.css';
import Users from './Users';
import PrivateRoute from 'components/PrivateRoute'
import Products from './Products/intex';

const Admin = () => {
  return (
    <div className="admin-container">
      <NavBar/>
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/products">
            <Products></Products>
          </PrivateRoute>
          <PrivateRoute path="/admin/categories">
            <h1>CRUD dos Categorias</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
