export const apiBaseUrl = 'http://172.30.1.92:8080';
export const authApiUrls = {
  signUpAPIUrl: `${apiBaseUrl}/members/signup`,
  loginAPIUrl: `${apiBaseUrl}/members/login`,
};
export const clubApiUrls = {
  clubGenerateAPIUrl: `${apiBaseUrl}/groups/signup`,
};

export const bookApiUrls = {
  bookSearchUrl: 'https://dapi.kakao.com/v3/search/book?target=title',
  registerBookUrl:`${apiBaseUrl}/librarys`
};
