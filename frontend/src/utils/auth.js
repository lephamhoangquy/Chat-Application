export const setHeaders = () => {
  let token = localStorage.getItem('token') || '';
  return { token };
};
