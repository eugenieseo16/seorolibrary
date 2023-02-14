import { useMyQuery } from './../hooks/useMyQuery';
import axios from 'axios';
import { placeAPIUrls } from './apiUrls';

interface IPlaceGenerateForm {
  placeMaker: Long;
  longitude: String;
  latitude: String;
  placePhoto: String[];
}
export const placeGenerateAPI = async (data: IPlaceGenerateForm) => {
  const response = await axios.post(placeAPIUrls.placeGenerateAPIUrl, data);
  return response;
};
