import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.notification);
  const showNotification = useSelector(
    (state) => state.notification.showNotification
  );

  console.log("not", notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div>{showNotification && <div style={style}>{notification}</div>}</div>
  );
};

export default Notification;
