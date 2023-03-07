import { SyntheticEvent } from "react";

import useInput from "../../utils/hooks/useInput";
import { isDisabledForm } from "../../utils/validators";

import {
	CenteredContent,
	CustomLink,
	FormDescription,
	Input,
	PageDescription,
	PageTitle,
	QuestionText,
	SubmitButton,
} from '../../components';
import { ROUTE_SIGN_IN } from "../../utils/constants";
import { cpAuthService } from "../../utils/virava";

const ResetPage = (): JSX.Element => {
	const email = useInput('', 'email');

	const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();

		try {
			await cpAuthService.resetPassword(email.value);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<CenteredContent>
			<PageTitle>Reset password</PageTitle>
			<PageDescription>Enter your email to reset your password.</PageDescription>
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
				<FormDescription>Fields that are marked with * sign are required.</FormDescription>
				<SubmitButton
					buttonText="reset password"
					disabled={isDisabledForm('reset', email)}
				/>
			</form>

			<QuestionText>
				Remember your password?&nbsp;
				<CustomLink to={ROUTE_SIGN_IN}>Sign in</CustomLink>
			</QuestionText>
		</CenteredContent>
	);
};

export default ResetPage;
