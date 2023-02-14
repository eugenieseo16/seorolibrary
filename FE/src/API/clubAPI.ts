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

export const clubMembersAPI = (groupId?: string) => {
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

interface IGroupDetail {
  groupName: string;
  groupProfile?: string;
  groupPassword?: string;
  groupStartDate?: string;
  groupDongCode: string;
  groupCapacity: number;
  groupGenre: number[];
  groupDescrib: string;
  bookCount: number;
  postCount: number;
  meetingCount: number;
}
export const clubDetailAPI = (groupId?: string) => {
  if (!groupId) return;
  const data: IGroupDetail | undefined = useMyQuery(
    `${clubAPIUrls.clubDetailAPIUrl}/${groupId}`,
  );
  return data;
};

interface IClubPost {
  groupId?: string;
  postCategory: string;
  startIdx: number;
  limit: number;
}
export const clubPostAPI = ({
  groupId,
  postCategory,
  startIdx,
  limit,
}: IClubPost) => {
  if (!groupId) return;
  const data = useMyQuery(
    `${clubAPIUrls.clubPostAPIUrl}?groupId=${groupId}&postCategory=${postCategory}&startIdx=${startIdx}&limit=${limit}`,
  );
  return data;
};
