import styled from 'styled-components';

import { getJwtTokenFromCookie, setJwtTokenCookie } from './cookieHelper';
import Navbar from './Navbar';
import { redirectToLogin } from './helpers';
const Wrapper = styled.section``;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const NavbarWrapper = styled.div`
  width: 100%;
`;

const Text = styled.p`
  font-weight: bold;
`;

const Login = (props) => {
  return <Text>HEY, A TOKEN EXISTS</Text>;
};

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const tokenParam = searchParams.get('token');

  if (tokenParam) {
    setJwtTokenCookie(tokenParam);
    const filteredUrl = window.location.href.replace(/([?&])token=[^&]+(&|$)/, '$1').replace(/[?&]$/, '');
    window.location.href = filteredUrl;
  }

  const jwtToken = getJwtTokenFromCookie();
  if (jwtToken == null) {
    alert('You must log in');
    redirectToLogin();
  }

  return (
    <Wrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        <Login jwtToken={jwtToken} />
      </ContentWrapper>
    </Wrapper>
  );
}

export default App;
