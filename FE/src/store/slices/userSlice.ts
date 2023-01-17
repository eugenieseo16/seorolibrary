import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  username: string;
  password: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: null as IUser | null,
  reducers: {
    login(state, action: { payload: IUser }) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
