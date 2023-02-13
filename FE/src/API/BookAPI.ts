import { useMyQuery } from './../hooks/useMyQuery';
import { apiUrls, bookAPIUrls } from './apiUrls';
import axios from 'axios';

export const bestSellerAPI = () => {
  const response = useMyQuery(bookAPIUrls.bestSellers);
  return response;
};

export const bookDetailAPI = (isbn: string) => {
  const response = useMyQuery(bookAPIUrls.bookDetail + isbn);
  return response;
};

export const nearBooksAPI = (memberId: string) => {
  const response = useMyQuery(nearBooksAPI + memberId);
  return response;
};
