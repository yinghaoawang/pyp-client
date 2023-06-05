import styled from 'styled-components';
import { removeJwtTokenCookie } from './cookieHelper';
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

const SignOutButton = styled.button`
  background-color: #555;
  border: none;
  cursor: pointer;
`;

const Navbar = () => {
  const handleSignOut = () => {
    removeJwtTokenCookie();
    redirectToLogin();
  };

  return (
    <NavbarContainer>
      <Title>My App</Title>
      <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
    </NavbarContainer>
  );
};

export default Navbar;
