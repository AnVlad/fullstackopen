import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  username: null,
  id: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logOutUser() {
      return initialState;
    },
  },
});

export const { setUser, logOutUser } = userReducer.actions;
export default userReducer.reducer;
