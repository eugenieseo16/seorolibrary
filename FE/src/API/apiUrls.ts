// export const apiBaseUrl = 'http://70.12.246.229:8080';
export const apiBaseUrl = 'http://localhost:8080';

export const authApiUrls = {
  signUpAPIUrl: `${apiBaseUrl}/members/signup`,
  loginAPIUrl: `${apiBaseUrl}/members/login`,
  jwtLoginAPIUrl: `${apiBaseUrl}/members`,
};
export const clubApiUrls = {
  clubGenerateAPIUrl: `${apiBaseUrl}/groups/signup`,
};
export const bookApiUrls = {
  bestSellers: `${apiBaseUrl}/main/best`,
  bookDetail: `${apiBaseUrl}/book/detail/`,
  nearBooks: `${apiBaseUrl}/main/nearbook/`,
  bookSearchUrl: 'https://dapi.kakao.com/v3/search/book?target=title',
  registerBookUrl: `${apiBaseUrl}/librarys`,
};

export const searchAPIUrl = `${apiBaseUrl}/main/search/`;
