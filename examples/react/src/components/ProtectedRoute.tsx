import { Redirect, Route, RouteProps } from 'react-router-dom';

import { ROUTE_SIGN_IN } from '../utils/constants';
import { isAuthenticated } from '../utils/helpers';
import Layout from './Layout';

export const ProtectedRoute = (props: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to={ROUTE_SIGN_IN} />;
  }

  return <Layout><Route {...props} /></Layout>;
};
