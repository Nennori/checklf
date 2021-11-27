/* eslint-disable no-console */
export function authAccessHeader() {
  const userData = localStorage.getItem('user');

  if (userData !== null) {
    const user = JSON.parse(userData);
    const accessToken = localStorage.getItem(`${user.name}_access`);
    if (accessToken !== null) {
      return accessToken;
    }
  }
  return '';
}

export function authRefreshHeader() {
  const userData = localStorage.getItem('user');
  if (userData !== null) {
    const user = JSON.parse(userData);
    const refreshToken = localStorage.getItem(`${user.name}_refresh`);
    if (refreshToken !== null) {
      console.log(refreshToken);
      return refreshToken;
    }
  }
  return '';
}
