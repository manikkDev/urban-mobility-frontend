const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const authenticateAdmin = (username, password) => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const setAdminSession = () => {
  sessionStorage.setItem('adminAuthenticated', 'true');
};

export const clearAdminSession = () => {
  sessionStorage.removeItem('adminAuthenticated');
};

export const isAdminAuthenticated = () => {
  return sessionStorage.getItem('adminAuthenticated') === 'true';
};
