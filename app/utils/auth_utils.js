export function isAuthenticated() {
  return !!sessionStorage.getItem('token');
}

export function authenticate(token) {
  sessionStorage.setItem('token', token);
}

export function getToken() {
  return sessionStorage.getItem('token');
}

export function deleteToken() {
  sessionStorage.removeItem('token');
}