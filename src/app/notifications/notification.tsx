import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { intervalCalculator } from "@/helper/interval-calculator";
import Link from "next/link";
import FollowButton from "@/components/followButton";
import { FollowersType, NotificationType } from "./page";
import { Frown } from "lucide-react";
import { notifType } from "@/helper/notif-type-maker";

const Notification: React.FC<NotificationType & FollowersType> = async ({
  id,
  type,
  post,
  creator,
  createdAt,
  followers,
}) => {
  

  return (
    <div key={id} className="p-2 rounded border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="size-12 shadow border">
            {creator && creator?.img && (
              <AvatarImage src={creator.img} alt="@shadcn" />
            )}
            <AvatarFallback>{creator?.name?.split("")[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-0 5">
              <h1 className="font-bold text-sm text-primary px-1">
                {creator?.username}
              </h1>
              <p className="text-muted-foreground text-sm px-1">
                {notifType(type)}
              </p>
            </div>
            {createdAt && (
              <p className="text-muted-foreground md:text-xs text-[10px]">
                {intervalCalculator(createdAt)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {(type == "COMMENT" || type == "LIKE") && (
            <Link href={`/posts/${post?.id}`}>
              <Avatar className="size-12 shadow border !rounded">
                {post?.img && <AvatarImage src={post.img} alt="@shadcn" />}
                <AvatarFallback>
                  <Frown />
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          {type == "FOLLOW" &&
            followers?.find(
              (follower: { followingId: string }) =>
                follower.followingId !== creator.id
            ) && <FollowButton userID={creator.id} />}
        </div>
      </div>
    </div>
  );
};

export default Notification;
