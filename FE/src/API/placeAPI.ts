import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

export const placeRecomendAPI = (memberId: any) => {
  const response = axios.get(`${placeAPIUrls.main}`, {
    params: { memberId: memberId },
  });
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
