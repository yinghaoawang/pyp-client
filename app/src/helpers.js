export function redirectToLogin(redirectUrl = window.location.href) {
  window.location.href =
    'http://localhost:5173?redirect=' + encodeURIComponent(redirectUrl);
}
