import { getNotification, markNotificationAsRead } from "@/lib/actions/notfication-action";
import { GetUserFollowers, GetUserId } from "@/lib/actions/user-action";
import Notification from "./notification";

export type Notifications = Awaited<ReturnType<typeof getNotification>>;
export type NotificationType = Notifications[number];
export type FollowersType = {
  followers: Awaited<ReturnType<typeof GetUserFollowers>>;
};

const Page = async () => {
  const [notifications, followers, userId] = await Promise.all([getNotification(), GetUserFollowers(), GetUserId()]);
  if (userId == null) return null;
  await markNotificationAsRead(userId);
  if (!notifications) return null;
  

  return (
    <div className="shadow border p-4 rounded">
      <h1 className="text-2xl font-bold text-primary mb-5">Notifications</h1>
      <div className="flex flex-col gap-2">
        {notifications.map((notification :NotificationType) => {
          return <Notification key={notification.id} {...notification} followers={followers}/>;
        })}
      </div>
    </div>
  );
};

export default Page;
