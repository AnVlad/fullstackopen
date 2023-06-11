import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.notification);
  const showNotification = useSelector(
    (state) => state.notification.showNotification
  );

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const style2 = {
    height: 60,
  };

  return (
    <div style={style2}>
      {showNotification && <div style={style}>{notification}</div>}
    </div>
  );
};

export default Notification;
