import { Redirect, Route } from 'react-router-dom';
import { isUserAuthenticated } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
};
const PrivateRoute = ({ children, path }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        isUserAuthenticated() ? (
          <>{children}</>
        ) : (
          // vai direcionar para página protegida que estava tentando acessar antes de estar logado
          <Redirect to={{
            pathname: "/admin/auth/login",
            state: {from: location}
          }} />
        )
      }
    />
  );
};
export default PrivateRoute;
