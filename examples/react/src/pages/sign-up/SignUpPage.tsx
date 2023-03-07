import { ChangeEvent, SyntheticEvent } from "react";

import useInput from "../../utils/hooks/useInput";
import { isDisabledForm } from "../../utils/validators";

import {
	CustomLink,
	FormDescription,
	Input,
	PageDescription,
	PageTitle,
	ResponsiveContainer,
	SubmitButton,
	QuestionText,
} from '../../components';
import { ROUTE_SIGN_IN } from "../../utils/constants";
import { cpAuthService } from "../../utils/virava";

const SignUpPage = (): JSX.Element => {
	const email = useInput('', 'email');
	const password = useInput('', 'password');
	const confirmPassword = useInput('', 'confirmPassword');

	const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();

		try {
			await cpAuthService.register(email.value, password.value, confirmPassword.value);
		} catch(error) {
			console.error(error);
		}
	};

	return (
		<ResponsiveContainer>
			<PageTitle>Sign up</PageTitle>
			<PageDescription>Enter your details and start your journey with us!</PageDescription>
			<form onSubmit={handleSubmit}>
				<Input
					id="email"
					type="email"
					label="Email"
					variant="outlined"
					value={email.value || ''}
					onChange={email.onChange}
					autoComplete="off"
					required
					error={email.hasError}
					helperText={email.message}
					margin="normal"
					fullWidth
				/>
				<Input
					id="password"
					type="password"
					label="Password"
					variant="outlined"
					value={password.value || ''}
					onChange={password.onChange}
					autoComplete="off"
					required
					error={password.hasError}
					helperText={password.message}
					margin="normal"
					fullWidth
				/>
				<Input
					id="confirmPassword"
					type="password"
					label="Confirm Password"
					variant="outlined"
					value={confirmPassword.value || ''}
					onChange={(event) => confirmPassword.onChange(event as ChangeEvent<HTMLInputElement>, password.value)}
					autoComplete="off"
					required
					error={confirmPassword.hasError}
					helperText={confirmPassword.message}
					margin="normal"
					fullWidth
				/>
				<FormDescription>Fields that are marked with * sign are required.</FormDescription>
				<SubmitButton
					buttonText="Sign up"
					disabled={isDisabledForm('register', email, password, confirmPassword)}
				/>
			</form>

			<QuestionText>
				Already have an account?&nbsp;
				<CustomLink to={ROUTE_SIGN_IN}>Sign in</CustomLink>
			</QuestionText>
		</ResponsiveContainer>
	);
};

export default SignUpPage;
