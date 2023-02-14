import { authApiUrls } from './apiUrls';
import axios from 'axios';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends ILoginForm {
  memberEmail: string;
  memberPassword: string;
  memberName: string;
  dupchkPassword: string;
}

export const signUpAPI = async (data: ISignUpForm) => {
  const response = await axios.post(authApiUrls.signUpAPIUrl, data);
  return response;
};

export const loginAPI = async (data: ILoginForm) => {
  const response = await axios.post(authApiUrls.loginAPIUrl, data);
  return response;
};
export const jwtLoginAPI = async (token: string) => {
  const { data: response } = await axios.post(
    authApiUrls.loginAPIUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('JWT!!!', response);
  return response;
};
