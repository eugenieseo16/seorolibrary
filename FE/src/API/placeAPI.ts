import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

export const placeRecomendAPI = (memberId: any) => {
  const response = axios.get(`${placeAPIUrls.main}`, {
    params: { memberId: memberId },
  });

};

interface IPlaceGenerateForm {
  placeMaker: Long;
  longitude: String;
  latitude: String;
  placePhoto: String[];
}
export const placeGenerateAPI = async (data: IPlaceGenerateForm) => {
  const response = await axios.post(placeAPIUrls.placeGenerateAPIUrl, data);
  return response;
