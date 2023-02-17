import { useMyQuery } from '@src/hooks/useMyQuery';
import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

export const placeRecomendAPI = (memberId: any) => {
  const response = useMyQuery(`${placeAPIUrls.main}?memberId=${memberId}`);
  return response;
};

interface IPlaceGenerateForm {
  placeName: String;
  placeMaker: Long;
  placeDescrib: String;
  longitude: String;
  latitude: String;
  placePhoto: String[];
}
export const placeGenerateAPI = async (data: IPlaceGenerateForm) => {
  const response = await axios.post(placeAPIUrls.main, data);
  return response;
};

export const placeDetailAPI = (placeId: any) => {
  console.log(placeId);
  if (placeId == undefined) return;
  const response = useMyQuery(`${placeAPIUrls.placeDetail}/${placeId}`);
  return response;
};

// export const addPlaceReviewAPI = (data: IPlaceReview, placeId: any) => {
//   const response = axios.post(`${placeAPIUrls.placeDetail}/${placeId}`, data);
//   return;
// };

interface IPlaceReview {
  score: number;
  memberName?: string;
  placeReview: string;
  placeReviewPhotos?: string[];
}
export const addPlaceReviewAPI = (data: IPlaceReview, placeId: any) => {
  const response = axios.post(`${placeAPIUrls.placeDetail}/${placeId}`, data);
  return;
};
