import { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';

import './App.css';

import ChangePassword from './pages/change-password/ChangePasswordPage';
import Home from './pages/home/Home';
import ResetPage from './pages/reset/ResetPage';
import SignInPage from './pages/sign-in/SignInPage';
import SignUpPage from './pages/sign-up/SignUpPage';

import { AppContainer, AuthProtectedRoute, ProtectedRoute } from './components';

import {ROUTE_RESET_PASSWORD, ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_HOME, ROUTE_CHANGE_PASSWORD} from './utils/constants';
import { cpAuthService, authConfig } from './utils/virava';

const App = (): JSX.Element => {
	useEffect(() => {
		cpAuthService.init(authConfig);
	}, []);

	return (
		<AppContainer>
			<Router>
				<Switch>
					<AuthProtectedRoute
						path={ROUTE_SIGN_IN}
						exact
						component={SignInPage}
					/>
					<AuthProtectedRoute
						path={ROUTE_SIGN_UP}
						exact
						component={SignUpPage}
					/>
					<AuthProtectedRoute
						path={ROUTE_RESET_PASSWORD}
						exact
						component={ResetPage}
					/>
					<ProtectedRoute path={ROUTE_CHANGE_PASSWORD} exact component={ChangePassword} />
					<ProtectedRoute path={ROUTE_HOME} exact component={Home} />
				</Switch>
			</Router>
		</AppContainer>
	);
}

export default App;
