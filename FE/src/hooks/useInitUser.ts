import { login, updateLocation } from '@src/store/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * localstorage 에서 유저정보 받고 없으면 익명로그인 상태
 * 유저 위치정보 받고, 전역으로 설정 => redux
 */
export default function useInitUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('ssafy-user');
    if (!user) {
      dispatch(login({ username: 'incognito', password: '1234' }));
    } else {
      dispatch(login(JSON.parse(user)));
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(updateLocation({ latitude, longitude }));
      },
    );
  }, []);
}
