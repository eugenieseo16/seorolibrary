// export const apiBaseUrl = 'http://70.12.246.229:8080';
export const apiBaseUrl = 'http://localhost:8080';

export const apiUrls = {
  signUpAPIUrl: `${apiBaseUrl}/members/signup`,
  loginAPIUrl: `${apiBaseUrl}/members/login`,
};

export const bookAPIUrls = {
  bestSellers: `${apiBaseUrl}/main/best`,
  bookDetail: `${apiBaseUrl}/book/detail/`,
  nearBooks: `${apiBaseUrl}/main/nearbook/`,
};

export const searchAPIUrl = `${apiBaseUrl}/main/search/`;
