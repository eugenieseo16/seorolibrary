import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

export const placeRecomendAPI = (memberId: any) => {
  const response = axios.get(`${placeAPIUrls.main}`, {
    params: { memberId: memberId },
  });
};
