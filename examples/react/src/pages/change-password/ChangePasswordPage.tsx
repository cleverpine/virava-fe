import {SyntheticEvent, ChangeEvent} from 'react';

import useInput from '../../utils/hooks/useInput';
import { isChangePasswordFormDisabled } from '../../utils/validators';
import { FormDescription, Input, PageTitle, ResponsiveContainer, SubmitButton } from '../../components';
import { cpAuthService } from '../../utils/virava';

const ChangePassword = () => {
  const email = useInput('', 'email');
  const currentPassword = useInput('', 'currentPassword');
  const newPassword = useInput('', 'newPassword');
  const confirmPassword = useInput('', 'confirmPassword');

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      await cpAuthService.changePassword(email.value, currentPassword.value, newPassword.value, confirmPassword.value);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <ResponsiveContainer>
      <PageTitle>Change password</PageTitle>
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
          id="currentPassword"
          type="password"
          label="Current Password"
          variant="outlined"
          value={currentPassword.value || ''}
          onChange={currentPassword.onChange}
          autoComplete="off"
          required
          error={currentPassword.hasError}
          helperText={currentPassword.message}
          margin="normal"
          fullWidth
        />
        <Input
          id="newPassword"
          type="password"
          label="New Password"
          variant="outlined"
          value={newPassword.value || ''}
          onChange={newPassword.onChange}
          autoComplete="off"
          required
          error={newPassword.hasError}
          helperText={newPassword.message}
          margin="normal"
          fullWidth
        />
				<Input
					id="confirmPassword"
					type="password"
					label="Confirm Password"
					variant="outlined"
					value={confirmPassword.value || ''}
					onChange={(event) => confirmPassword.onChange(event as ChangeEvent<HTMLInputElement>, newPassword.value)}
					autoComplete="off"
					required
					error={confirmPassword.hasError}
					helperText={confirmPassword.message}
					margin="normal"
					fullWidth
				/>
        <FormDescription>Fields that are marked with * sign are required.</FormDescription>
        <SubmitButton
          buttonText="Change password"
          disabled={isChangePasswordFormDisabled(email, currentPassword, newPassword, confirmPassword)}
        />
      </form>
    </ResponsiveContainer>
  );
}

export default ChangePassword;
