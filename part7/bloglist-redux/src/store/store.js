import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reduces/notificationReducer';
import blogsReducer from '../reduces/blogsReducer';
import userReducer from '../reduces/userReducer';
import allUsersReducer from '../reduces/allUsersReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: allUsersReducer,
  },
});

export default store;
