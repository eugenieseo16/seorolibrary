import axios from 'axios';
import { geoAPIUrls } from './apiUrls';

export const dongcodeAPI = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const { data } = await axios.get(`${geoAPIUrls.dongcodeAPIUrl}`, {
    params: {
      latitude,
      longitude,
    },
  });

  return data;
};
