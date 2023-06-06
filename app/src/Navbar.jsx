import styled from 'styled-components';
import { getJwtTokenFromCookie, removeJwtTokenCookie } from './cookieHelper';
import { redirectToLogin } from './helpers';

const NavbarContainer = styled.nav`
  box-sizing: border-box;
  background-color: #004;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const AuthButton = styled.button`
  border: none;
  cursor: pointer;
`;

const SignOutButton = styled(AuthButton)`
  background-color: #555;
`;

const LoginButton = styled(AuthButton)`
  background-color: #aaa;
`;

const Navbar = () => {
  const handleSignOut = () => {
    removeJwtTokenCookie();
    alert('Signed out');
    window.location.reload();
  };

  const handleLogin = () => {
    redirectToLogin();
  };

  const jwtToken = getJwtTokenFromCookie();

  return (
    <NavbarContainer>
      <Title>My App</Title>
      {jwtToken ? (
        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
      ) : (
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
