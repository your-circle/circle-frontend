import { NextPage } from "next";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getNotification } from "../../shared/services/notification.services";
import NotificationCard from "../../components/notification/NotificationCard";
import { useContext, useEffect, useState } from "react";
import EmptyList from "../../shared/components/EmptyList";
import Loading from "../../shared/components/Loading";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";
import { themeContext } from "../../providers/themeProvider";

const Notification: NextPage = () => {
  const { theme } = useContext(themeContext);
  useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationCardType[]>(
    []
  );
  const [range, setRange] = useState({ from: 1, to: 10 });
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    fetchNotifications();

    // const data = setInterval(() => {
    //   fetchNotifications();
    // }, 50000)

    // return () => {
    // clearInterval(data)
    // };
  }, [range]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotification(range);
      setNotifications(res?.data?.notifications || []);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${
        theme === "light" ? "bg-light-theme-bg" : "bg-main-bg"
      } min-h-[calc(100vh-65px)]`}
    >
      <h1
        className={`text-center w-full text-xl text-main-gradient my-2 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Notifications
      </h1>
      {isLoading ? (
        <Loading />
      ) : notifications?.length === 0 ? (
        <EmptyList message="No Notifications available" />
      ) : (
        <>
          {notifications?.map((notification, index) => (
            <NotificationCard {...notification} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default Notification;
