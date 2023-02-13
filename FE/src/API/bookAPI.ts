import axios from 'axios';
import { bookApiUrls } from './apiUrls';

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
export const registerBook = async () => {
  
};
