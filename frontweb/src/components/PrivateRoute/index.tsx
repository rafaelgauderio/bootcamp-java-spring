import { Redirect, Route } from 'react-router-dom';
import { isUserAuthenticated } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
};
const PrivateRoute = ({ children, path }: Props) => {
  return (
    <Route
      path={path}
      render={() =>
        isUserAuthenticated() ? (
          <>{children}</>
        ) : (
          <Redirect to="/admin/auth/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
