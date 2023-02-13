import axios from 'axios';
import { clubApiUrls } from './apiUrls';

interface IClubGenerateForm {
  groupName: string;
  groupHostId: string;
  groupCapacity: number;
  groupDongCode: string;
  groupGenres: number[];
  groupIntroduction: string;
  groupProfile?: string;
  groupPassword?: string;
}
export const clubGenerateAPI = async (data: IClubGenerateForm) => {
  const response = await axios.post(clubApiUrls.clubGenerateAPIUrl, data);
  return response;
};
