import { useMyQuery } from './../hooks/useMyQuery';
import axios from 'axios';
import { clubAPIUrls } from './apiUrls';

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
  const response = await axios.post(clubAPIUrls.clubGenerateAPIUrl, data);
  return response;
};

export interface IGroup {
  groupName: string;
  groupDescrib: string;
  groupId: number;
  groupProfile?: string;
}
interface IMember {
  memberName: string;
  memberId: string;
  memberProfile?: string;
}
export interface IClubMainResponse {
  result: boolean;
  myGroups: IGroup[];
  recommendGroups: IGroup[];
  recommendMembers: IMember[];
}

export const useClubMainAPI = (username?: string) => {
  if (!username) return;
  const response: IClubMainResponse = useMyQuery(
    `${clubAPIUrls.clubMainAPIUrl}/${username}`,
  );
  return response;
};

export const clubMembersAPI = (groupId?: number) => {
  if (!groupId) return;
  const response = useMyQuery(
    `${clubAPIUrls.clubMembersAPIUrl}?groupId=${groupId}`,
  );
  return response;
};

interface IClubEnter {
  groupId: number;
  userId: number;
  writePassword: string;
}
export const clubEnterAPI = async (data: IClubEnter) => {
  const { data: response } = await axios.post(
    `${clubAPIUrls.clubEnterAPIUrl}/${data.groupId}`,
    data,
  );
  return response;
};
