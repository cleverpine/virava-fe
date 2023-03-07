import styled from '@emotion/styled';
import { CenteredContent } from '../components';

export const ResponsiveContainer = styled(CenteredContent)({
	'@media screen and (max-height: 780px)': {
		display: 'block'
	}
});
