import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const CustomLink = styled(Link)({
	fontWeight: 500,
	textDecoration: 'none',
	color: 'var(--cp-auth-primary-main)',
	cursor: 'pointer',

	'&:hover': {
		color: 'var(--cp-auth-primary-dark)'
	}
});
