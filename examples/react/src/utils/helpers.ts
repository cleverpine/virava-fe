export const getToken = () => {
  try {
    return localStorage.getItem('access_token');
  } catch (error) {
    console.error('Error getting token from storage');
  }
}

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (token && token !== 'undefined' && token !== 'null') {
    return true;
  }

  return false;
};
