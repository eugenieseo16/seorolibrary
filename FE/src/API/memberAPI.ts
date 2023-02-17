import axios from 'axios';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { memberAPIUrls } from './apiUrls';

interface IEditProfileForm {
  memberName: string;
  memberProfile: string;
  memberDongcode: string;
  memberGenre: number[];
}

// export const memberDetailAPI = (memberName: string) => {
//   const response = useMyQuery(`${memberAPIUrls.memberDetail}/${memberName}`);
//   return response;
// };

export const holdBooksAPI = (targetMemberId: any, myMemberId: any) => {
  const response = useMyQuery(
    `${memberAPIUrls.memberDetail}/${targetMemberId}?memberId=${myMemberId}`,
  );
  return response;
};

export const editProfileAPI = async (data: IEditProfileForm | any) => {
  const response = await axios.put(
    `${memberAPIUrls.myProfile}/${data.exist}`,
    data,
  );
  return response;
};
