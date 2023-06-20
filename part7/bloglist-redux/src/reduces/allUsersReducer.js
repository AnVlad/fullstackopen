import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const allUsersReducer = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setAllUsers } = allUsersReducer.actions;
export default allUsersReducer.reducer;
