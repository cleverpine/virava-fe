import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';

import useInput from '../../utils/hooks/useInput';
import { isDisabledForm } from '../../utils/validators';

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
import { ROUTE_HOME, ROUTE_RESET_PASSWORD, ROUTE_SIGN_UP } from '../../utils/constants';
import { cpAuthService } from '../../utils/virava';

const SignInPage = (): JSX.Element => {
  const history = useHistory();

  const email = useInput('', 'email');
  const password = useInput('', 'password');

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      await cpAuthService.login(email.value, password.value);
      history.push(ROUTE_HOME);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <ResponsiveContainer>
      <PageTitle>Sign in</PageTitle>
      <PageDescription>
        Don’t have an account?&nbsp;
        <CustomLink to={ROUTE_SIGN_UP}>Sign up</CustomLink>
      </PageDescription>
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
        <FormDescription>Fields that are marked with * sign are required.</FormDescription>
        <SubmitButton
          buttonText="Sign in"
          disabled={isDisabledForm('login', email, password)}
        />
      </form>

        <QuestionText>
          Forgot your password?&nbsp;
          <CustomLink to={ROUTE_RESET_PASSWORD}>Reset password</CustomLink>
        </QuestionText>
    </ResponsiveContainer>
  );
};

export default SignInPage;
