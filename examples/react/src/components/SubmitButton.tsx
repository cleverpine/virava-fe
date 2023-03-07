import styled from '@emotion/styled';

import { Button } from '@mui/material';

const CustomButton = styled(Button)({
	width: '100%',
	height: '56px',
	margin: '8px 0',
	fontSize: '16px',
	fontWeight: 400,
	color: 'var(--cp-auth-background-default)',
	backgroundColor: 'var(--cp-auth-primary-main)',
	boxShadow: '0px 2px 1px var(--cp-auth-button-box-shadow-color)',
	'&:hover': {
		backgroundColor: 'var(--cp-auth-primary-dark)'
	},
	'&:disabled': {
		opacity: 0.7
	}
});

export const SubmitButton = ({ buttonText, disabled }: { buttonText: string, disabled: boolean }): JSX.Element => {
	return (
		<CustomButton type="submit" disabled={disabled}>{buttonText}</CustomButton>
	);
};
