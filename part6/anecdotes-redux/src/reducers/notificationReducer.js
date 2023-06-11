import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "render here notification...",
  showNotification: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return { ...state, notification: action.payload };
    },
    showNotification(state, action) {
      return { ...state, showNotification: true };
    },
    closeNotification(state, action) {
      return { ...state, showNotification: false };
    },
  },
});

export const { setNotification, showNotification, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification2 = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    dispatch(showNotification());
    setTimeout(() => dispatch(closeNotification()), time);
  };
};
