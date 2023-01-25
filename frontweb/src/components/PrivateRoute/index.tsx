import { Redirect, Route } from 'react-router-dom';
import { hasSomeRoles, isUserAuthenticated, Role } from 'util/auth';


type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role []; // roles é um parâmetro opcional
};
const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        !isUserAuthenticated() ? (
          <Redirect to={{
            pathname: "/admin/auth/login",
            state: {from: location},
          }}/> ) : 
          !hasSomeRoles(roles) ? (
            <Redirect to="admin/products" />
          ) : (
          <>{children}</>
          )     
      }
    />
  );
};
export default PrivateRoute;
