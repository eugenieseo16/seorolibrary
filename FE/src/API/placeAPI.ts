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
  const response = useMyQuery(`${placeAPIUrls.placeDetail}/${placeId}`);
  return response;
};
