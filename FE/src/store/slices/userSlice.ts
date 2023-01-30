import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  username: string;
  password: string;
  location?: {
    latitude: string;
    longitude: string;
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState: null as IUser | null,
  reducers: {
    login(state, action: { payload: IUser }) {
      localStorage.setItem('ssafy-user', JSON.stringify(action.payload));
      return action.payload;
    },
    logout() {
      localStorage.removeItem('ssafy-user');
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
