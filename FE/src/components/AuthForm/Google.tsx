import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth, firebaseDB } from '@src/utils/fireBase';
import { jwtLoginAPI, loginAPI, signUpAPI } from '@src/API/authAPI';
import { doc, setDoc } from 'firebase/firestore';
import { login } from '@src/store/slices/userSlice';
import { useDispatch } from 'react-redux';

const provider = new GoogleAuthProvider();

function Google({ children }: any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const res = await signInWithPopup(firebaseAuth, provider);
    console.log(res.user.email, res.user.displayName, res.user.uid);
    if (!res.user.email) return;
    const { data: loginResponse } = await loginAPI({
      email: res.user.email + res.user.uid,
      password: res.user.uid,
    });
    // 이미 회원
    if (loginResponse.accessToken) {
      const jwtResponse = await jwtLoginAPI(loginResponse.accessToken);
      localStorage.setItem('ssafy-token', loginResponse.accessToken);
      dispatch(login(jwtResponse));
    }
    //신규
    else {
      const { data: response } = await signUpAPI({
        dupchkPassword: res.user.uid,
        memberEmail: res.user.email + res.user.uid,
        memberName: res.user.displayName
          ? res.user.displayName.replaceAll('[', '').replaceAll(']', '')
          : res.user.email.split('@')[0],
        memberPassword: res.user.uid,
      });
      if (response.result) {
        const { data: newLoginRes } = await loginAPI({
          email: res.user.email + res.user.uid,
          password: res.user.uid,
        });
        const jwtResponse = await jwtLoginAPI(newLoginRes.accessToken);
        localStorage.setItem('ssafy-token', newLoginRes.accessToken);
        dispatch(login(jwtResponse));
        setDoc(doc(firebaseDB, jwtResponse?.memberId + '', 'chats-list'), {
          chatIds: [],
        });
      }
    }
    setLoading(false);
  };
  return <div onClick={handleLogin}>{children}</div>;
}

export default Google;
