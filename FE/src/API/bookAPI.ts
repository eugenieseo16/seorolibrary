import { useMyQuery } from '../hooks/useMyQuery';
import { bookApiUrls, searchAPIUrl } from './apiUrls';
import axios from 'axios';

export const bestSellerAPI = () => {
  const response = useMyQuery(bookApiUrls.bestSellers);
  return response;
};

export const nearBooksAPI = (memberId: string) => {
  const response = useMyQuery(nearBooksAPI + memberId);
  return response;
};

export const bookSearchByTitle = async (title: string) => {
  if (title.length < 1) return;
  const {
    data: { documents },
  } = await axios.get(bookApiUrls.bookSearchUrl, {
    params: { query: title },
    headers: {
      Authorization: 'KakaoAK 76696decbc2b8fb9e7c0a21c55e4508d',
    },
  });
  return documents;
};
export const registerBook = async () => {};

export const searchAPI = (input: string) => {
  const response = useMyQuery(searchAPIUrl + input);
  return response;
};
