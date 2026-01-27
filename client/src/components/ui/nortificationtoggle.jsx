import { PostUser } from "../../auth/auth";
export default function NotificationToggle({ enabled, setEnabled }) {
  const toggleNotifications = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Please allow browser notifications");
      return;
    }

    const res = await PostUser("toggle-notifications");
    setEnabled(res.data.enabled);
    alert(res.data.message);
  };

  return (
    <button onClick={toggleNotifications}>
      {enabled ? "Disable Notifications" : "Enable Notifications"}
    </button>
  );
}
