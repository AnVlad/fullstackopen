import React, { createContext, useReducer } from "react";

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.content;

    case "HIDE":
      return "";

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationsContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(notificationsReducer, "");

  return (
    <NotificationContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
