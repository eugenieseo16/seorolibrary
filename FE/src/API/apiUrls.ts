export const apiBaseUrl = 'http://localhost:8080';
// export const apiBaseUrl = 'http://localhost:8080';

export const authApiUrls = {
  signUpAPIUrl: `${apiBaseUrl}/members/signup`,
  loginAPIUrl: `${apiBaseUrl}/members/login`,
  jwtLoginAPIUrl: `${apiBaseUrl}/members`,
  userProfileAPIUrl: `${apiBaseUrl}/members`,
};
export const clubAPIUrls = {
  clubGenerateAPIUrl: `${apiBaseUrl}/groups/signup`,
  clubMainAPIUrl: `${apiBaseUrl}/groups`,
  clubMembersAPIUrl: `${apiBaseUrl}/groups/members`,
  clubEnterAPIUrl: `${apiBaseUrl}/groups/enter`,
};
export const bookApiUrls = {
  bestSellers: `${apiBaseUrl}/main/best`,
  bookDetail: `${apiBaseUrl}/book/detail/`,
  nearBooks: `${apiBaseUrl}/main/nearbook/`,
  bookSearchUrl: 'https://dapi.kakao.com/v3/search/book?target=title',
  registerBookUrl: `${apiBaseUrl}/librarys`,

  editBookReview: `${apiBaseUrl}/book/review`,
  editBookComment: `${apiBaseUrl}/book/comment`,

  bookReview: `${apiBaseUrl}/book/detail/review/`,
  bookComment: `${apiBaseUrl}/book/detail/comment/`,
};
export const geoAPIUrls = {
  dongcodeAPIUrl: `${apiBaseUrl}/place/dong`,
};

export const searchAPIUrl = `${apiBaseUrl}/main/search/`;

export const memberAPIUrls = {
  myProfile: `${apiBaseUrl}/members`,
  memberDetail: `${apiBaseUrl}/librarys`,
};
