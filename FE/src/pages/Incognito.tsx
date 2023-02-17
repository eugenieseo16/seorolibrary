import { logout } from '@src/store/slices/userSlice';
import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

function Incognito() {
  const dispatch = useDispatch();

  return (
    <div>
      익명 로그인 상태에서는 접근 할 수없습니다.
      <div>
        로그인 해서 더 살펴보기
        <Button
          onClick={() => {
            dispatch(logout());
          }}
        >
          로그인
        </Button>
      </div>
    </div>
  );
}

export default Incognito;
