import axios from 'axios';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { memberAPIUrls } from './apiUrls';

interface IEditProfileForm {
  memberName: string;
  memberProfile: string;
  memberDongcode: string;
  memberGenre: number[];
}

export const memberDetailAPI = (memberName: string) => {
  const response = useMyQuery(memberAPIUrls.memberDetail + '/' + memberName);
  return response;
};

export const editProfileAPI = async (data: IEditProfileForm) => {
  console.log(data);
  const response = await axios.put(
    memberAPIUrls.myProfile + '/' + data.memberName,
    data,
  );
  // console.log(response);
  return response;
};
