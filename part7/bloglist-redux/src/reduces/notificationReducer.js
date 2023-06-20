import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: '',
  showNotification: false,
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return { ...state, notification: action.payload };
    },
    showNotification(state) {
      return { ...state, showNotification: true };
    },
    hideNotification(state) {
      return { ...state, showNotification: false };
    },
  },
});

export const { setNotification, showNotification, hideNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;

export const settingNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    dispatch(showNotification());
    setTimeout(() => {
      dispatch(hideNotification());
    }, time);
  };
};
