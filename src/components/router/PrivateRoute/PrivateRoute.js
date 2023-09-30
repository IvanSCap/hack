import { Redirect } from 'react-router-dom';
import { Route } from '../Route';

export const PrivateRoute = ({ component: Component, ...props }) => {
  // const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  return (
    <Route
      {...props}

      render={(props) => isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location }
          }}
        />
      )}
    />
  );
};
