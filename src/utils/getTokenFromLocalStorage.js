// eslint-disable-next-line import/prefer-default-export,consistent-return
export const getTokenFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.auth)?.token;
    // eslint-disable-next-line no-empty
  } catch {
  }
};
