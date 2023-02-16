export const apiBaseUrl = 'http://70.12.246.221:8080';
// export const apiBaseUrl = 'http://localhost:8080';
// export const apiBaseUrl = 'http://i8a209.p.ssafy.io:8080';

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
  clubDetailAPIUrl: `${apiBaseUrl}/groups/detail`,
  clubPostAPIUrl: `${apiBaseUrl}/groups/post`,
  clubCreatePostAPIUrl: `${apiBaseUrl}/groups/post`,
  clubPlanListAPIUrl: `${apiBaseUrl}/groups/schedule`,
  clubPlanGenerateAPIUrl: `${apiBaseUrl}/groups/schedule`,
};

export const bookApiUrls = {
  bestSellers: `${apiBaseUrl}/main/best`,
  bookDetail: `${apiBaseUrl}/book/detail`,
  holdBookDetail: `${apiBaseUrl}/book/detail/own`,
  nearBooks: `${apiBaseUrl}/main/nearbook`,
  bookSearchUrl: 'https://dapi.kakao.com/v3/search/book?target=title',
  registerBookUrl: `${apiBaseUrl}/librarys`,

  editBookReview: `${apiBaseUrl}/book/review`,
  editBookComment: `${apiBaseUrl}/book/comment`,

  bookReader: `${apiBaseUrl}/book/readpeople`,
  bookReview: `${apiBaseUrl}/book/detail/review`,
  bookComment: `${apiBaseUrl}/book/detail/comment`,
};
export const geoAPIUrls = {
  dongcodeAPIUrl: `${apiBaseUrl}/place/dong`,
};

export const searchAPIUrl = `${apiBaseUrl}/main/search/`;

export const memberAPIUrls = {
  myProfile: `${apiBaseUrl}/members`,
  memberDetail: `${apiBaseUrl}/librarys`,
};

export const placeAPIUrls = {
  main: `${apiBaseUrl}/place`,
  placeDetail: `${apiBaseUrl}/place/detail`,
};

export const libraryAPIUrls = {
  libraryData: `${apiBaseUrl}/librarys`,
};
