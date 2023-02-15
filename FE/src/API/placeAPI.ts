import { useMyQuery } from '@src/hooks/useMyQuery';
import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

export const placeRecomendAPI = (memberId: any) => {
  const response = useMyQuery(`${placeAPIUrls.main}?memberId=${memberId}`);
  return response;
};

interface IPlaceGenerateForm {
  placeMaker: number;
  longitude: string;
  latitude: string;
  placePhoto: string[];
}
export const placeGenerateAPI = async (data: IPlaceGenerateForm) => {
  const response = await axios.post(placeAPIUrls.main, data);
  return response;
};

export const placeDetailAPI = (placeId: string) => {
  const response = useMyQuery(`${placeAPIUrls.placeDetail}/${placeId}`);
  return response;
};
