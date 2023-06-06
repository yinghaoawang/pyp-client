import styled from 'styled-components';

import { getJwtTokenFromCookie, setJwtTokenCookie } from './cookieHelper';
import Navbar from './Navbar';
import { useEffect } from 'react';
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

const Home = (props) => {
  return <Text>HEY, WELCOME TO THE SITE</Text>;
};

const Dashboard = (props) => {
  return <Text>Good job, logging in</Text>;
};

function App() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setJwtTokenCookie(tokenParam);
      const filteredUrl = window.location.href
        .replace(/([?&])token=[^&]+(&|$)/, '$1')
        .replace(/[?&]$/, '');
      window.location.href = filteredUrl;
    }
  }, []);

  const jwtToken = getJwtTokenFromCookie();

  return (
    <Wrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        {jwtToken ? <Dashboard /> : <Home />}
      </ContentWrapper>
    </Wrapper>
  );
}

export default App;
