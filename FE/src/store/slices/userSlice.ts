import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@src/types/types';

const userSlice = createSlice({
  name: 'user',
  initialState: null as IUser | null,
  reducers: {
    login(state, action: { payload: any }) {
      return action.payload;
    },
    logout() {
      console.log('aa');
      localStorage.removeItem('ssafy-token');
      return null;
    },
    updateLocation(state, action) {
      const userData = localStorage.getItem('ssafy-user');
      if (!userData) return;
      JSON.parse(userData).location = action.payload;
    },
  },
});

export const { login, logout, updateLocation } = userSlice.actions;
export const userReducer = userSlice.reducer;
