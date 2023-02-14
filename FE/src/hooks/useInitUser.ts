import { jwtLoginAPI } from '@src/API/authAPI';
import { login, updateLocation } from '@src/store/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * localstorage 에서 유저정보 받고 없으면 익명로그인 상태
 * 유저 위치정보 받고, 전역으로 설정 => redux
 */
const testUser = {
  username: 'testUser',
  email: 'testUser@test.com',
  _id: '1',
};

export default function useInitUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const jwtToken = localStorage.getItem('ssafy-token');
      if (!jwtToken) return;
      try {
        const jwtResponse = await jwtLoginAPI(jwtToken);
        dispatch(login(jwtResponse));
      } catch {
        localStorage.removeItem('ssafy-token');
      }
    })();
  }, []);
}
