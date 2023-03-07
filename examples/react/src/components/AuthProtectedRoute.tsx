import { Redirect, Route, RouteProps } from 'react-router-dom';

import { isAuthenticated } from '../utils/helpers';
import { ROUTE_HOME } from '../utils/constants';

export const AuthProtectedRoute = (props: RouteProps): JSX.Element => {
  if (isAuthenticated()) {
    return <Redirect to={ROUTE_HOME} />;
  }

  return <Route {...props} />;
};
