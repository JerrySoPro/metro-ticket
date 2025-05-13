import jwtDecode from 'jwt-decode';

// ✅ Use named export
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
