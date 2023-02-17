import { jwtLoginAPI, loginAPI } from '@src/API/authAPI';
import { login } from '@src/store/slices/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const INCOGNITO_PASSWORD = '3fdfc46c-b329-4341-b93b-da1ccf583813';
const INCOGNITO_EMAIL = 'incognito@gmail.com';
function Incognito({ children }: any) {
  const dispatch = useDispatch();
  const incognitoLogin = async () => {
    const { data: response }: any = await loginAPI({
      email: INCOGNITO_EMAIL,
      password: INCOGNITO_PASSWORD,
    });
    const jwtResponse = await jwtLoginAPI(response.accessToken);
    localStorage.setItem('ssafy-token', response.accessToken);
    dispatch(login(jwtResponse));
  };
  return <div onClick={incognitoLogin}>{children}</div>;
}

export default Incognito;
