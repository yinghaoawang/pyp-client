import { useState } from 'react';
import './App.css';

import { getJwtTokenFromCookie, setJwtTokenCookie } from './cookieHelper';

const Login = (props) => {
  return <>HEY, A TOKEN EXISTS</>;
};

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const tokenParam = searchParams.get('token');

  if (tokenParam) {
    setJwtTokenCookie(tokenParam);
  }
    
  const jwtToken = getJwtTokenFromCookie();

  if (jwtToken == null) {
    alert('You must log in');
    window.location.href = 'http://localhost:5173?redirect=' + encodeURIComponent(window.location.href);
  }

  return (
    <>
      <Login jwtToken={jwtToken} />
    </>
  );
}

export default App;
