import { useMyQuery } from '../hooks/useMyQuery';
import { bookApiUrls, searchAPIUrl } from './apiUrls';
import axios from 'axios';

interface ICreateBookReview {
  isbn: string;
  bookTitle: string;
  bookImage: string;
  memberName: string;
  reviewContent: string;
}

export const bestSellerAPI = () => {
  const response = useMyQuery('/bestSeller.json');

  return response?.map((data: any) => ({
    isbn: data.isbn.split(' ')[1],
    bookImage: data.thumbnail,
    bookTitle: data.title,
  }));
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

export interface IRegisterBook {
  memberId: number;
  isbn: string;
  bookTitle: string;
  ownComment: string;
}
export const registerBookAPI = async (data: IRegisterBook) => {
  const { data: response } = await axios.post(
    `${bookApiUrls.registerBookUrl}/${data.memberId}`,
    data,
  );
  return response;
};

export const searchAPI = (input: string) => {
  const response = useMyQuery(searchAPIUrl + input);
  return response;
};

export const bookDetailAPI = (isbn: string) => {
  const response = useMyQuery(bookApiUrls.bookDetail + isbn);
  return response;
};

export const bookReviewAPI = (isbn: string) => {
  const response = useMyQuery(bookApiUrls.bookReview + isbn);
  return response;
};

// 도서 리뷰 작성
export const bookReviewCreateAPI = (createValues: any) => {
  const response = axios.post(
    `${bookApiUrls.editBookReview}/${createValues.isbn}`,
    createValues,
  );
  return response;
};

// 도서 리뷰 수정
export const bookReviewEditAPI = '';

// 도서 리뷰 삭제
export const bookReviewDeleteAPI = (deleteValues: any, isbn: string) => {
  const response = axios.delete(
    `${bookApiUrls.editBookReview}/${isbn}`,
    deleteValues,
  );
};

export const bookCommentAPI = (isbn: string) => {
  const response = useMyQuery(bookApiUrls.bookComment + isbn);
  return response;
};
