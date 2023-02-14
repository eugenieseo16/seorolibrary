import axios from 'axios';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { memberAPIUrls } from './apiUrls';

interface IEditProfileForm {
  memberName: string;
  memberProfile: string;
  memberDongcode: string;
  memberGenre: number[];
}

export const memberDetailAPI = (memberId: string) => {
  const response = useMyQuery(memberAPIUrls.memberDetail + '/' + memberId);
  return response;
};

export const editProfileAPI = async (
  data: IEditProfileForm,
  memberId: string,
) => {
  const response = await axios.post(
    memberAPIUrls.editProfile + '/' + memberDetailAPI,
    data,
  );
};
