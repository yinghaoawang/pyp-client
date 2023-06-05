import Cookies from 'js-cookie';

export function getJwtTokenFromCookie() {
  const jwtToken = Cookies.get('jwtToken');

  return jwtToken;
}

export function setJwtTokenCookie(value) {
  Cookies.set('jwtToken', value);
}
