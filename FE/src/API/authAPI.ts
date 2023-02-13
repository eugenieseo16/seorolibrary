import { apiUrls } from './apiUrls';
import axios from 'axios';

export interface ILoginForm {
  memberEmail: string;
  memberPassword: string;
}
export interface ISignUpForm extends ILoginForm {
  memberName: string;
  dupchkPassword: string;
}

export const signUpAPI = async (data: ISignUpForm) => {
  const response = await axios.post(apiUrls.signUpAPIUrl, data);
  return response;
};

export const loginAPI = async (data: ILoginForm) => {
  const response = await axios.post(apiUrls.loginAPIUrl, data);
  return response;
};
