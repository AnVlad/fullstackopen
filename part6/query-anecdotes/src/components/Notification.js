import { useContext } from "react";
import NotificationContext from "../NotificationsContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notification, dispatch] = useContext(NotificationContext);

  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
