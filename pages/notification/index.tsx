import { NextPage } from "next";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getNotification } from "../../shared/services/notification.services";
import NotificationCard from "../../components/notification/NotificationCard";
import { useEffect, useState } from "react";
import EmptyList from "../../shared/components/EmptyList";
import Loading from "../../shared/components/Loading";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";

const Notification: NextPage = () => {
  useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationCardType[]>(
    []
  );

  const fetchNotification = async () => {
    try {
      const res = await getNotification();
      setNotifications(res?.data?.notifications || []);
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
        Notifications
      </h1>
      {isLoading ? (
        <Loading />
      ) : notifications?.length === 0 ? (
        <EmptyList message="No Notification" />
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
