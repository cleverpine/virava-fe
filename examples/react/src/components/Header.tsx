import { Link, useHistory } from 'react-router-dom';

import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { cpAuthService } from '../utils/virava';

import { ROUTE_CHANGE_PASSWORD, ROUTE_HOME, ROUTE_SIGN_IN } from '../utils/constants';

const StyledHeader = styled.header({
  display: 'flex',
  alignItems:' center',
  justifyContent: 'space-between',
  height: '60px',
  padding: '0 24px',
  color: '#ffffff',
  backgroundColor: 'var(--cp-auth-primary-main)',

  'a': {
    padding: '0 5px',
    color: 'inherit',
    textDecoration: 'none',
  },

  'a:hover': {
    textDecoration: 'underline'
  }
});

const Header = () => {
  const history = useHistory();

  const logout = async () => {
    try {
      await cpAuthService.logout();
      history.push(ROUTE_SIGN_IN);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <StyledHeader>
      <nav>
        <Link to={ROUTE_HOME}>Home</Link>
        <Link to={ROUTE_CHANGE_PASSWORD}>Change password</Link>
      </nav>
      <IconButton size="large" color="inherit" onClick={logout} title="Logout">
        <LogoutIcon />
      </IconButton>
    </StyledHeader>
  )
}

export default Header;
