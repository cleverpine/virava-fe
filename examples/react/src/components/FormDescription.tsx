import styled from '@emotion/styled';

export const FormDescription = styled.p({
	marginTop: '10px',
	marginBottom: '8px',
	textAlign: 'left',
	fontSize: '14px',
	fontStyle: 'italic',
	color: 'var(--cp-auth-text-primary)',

	'@media screen and (max-width: 550px)': {
		textAlign: 'center'
	}
});
