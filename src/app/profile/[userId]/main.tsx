import { MapPin, Link as LinkIcon, Calendar1, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { userProfileType } from "./page";

import EditButton from "./EditButton";
import { userAction } from "@/lib/actions/user-action";
import FollowButton from "./followButton";

type userType = {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
};

const Profile: FC<userProfileType> = async ({ user }) => {
  const currentUser = await userAction();
  if (user == null) return null;
  const customValues = user as userType;
  const isFollow = user.followers.some(
    (follower) => follower.followingId === user?.id
  );

  return (
    <section className="border rounded shadow flex flex-col items-center gap-4 p-4 md:px-8">
      <Avatar className="size-20 border shadow">
        {user.img && <AvatarImage src={user.img} alt="@shadcn" />}
        <AvatarFallback>{user.name?.split("")[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className="font-bold text-primary text-lg md:text-2xl">
          {user.name}
        </h1>
        <p className="text-muted-foreground text-sm md:text-md">
          {user.username ?? user.email.split("@")[0]}
        </p>
      </div>
      <p className="text-muted-foreground">{user.bio ?? user.email}</p>

      {currentUser?.id === user.id ? (
        <EditButton user={customValues} />
      ) : (
        <FollowButton isFollow={isFollow} userID={user.id} > {isFollow ? "UnFollow" : "Follow"}</FollowButton>
      )}
      <hr className="w-full h-[1px] mx-auto my-2 bg-border border-0 rounded-sm"></hr>

      <div className="flex items-center justify-between w-full ">
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="font-bold text-lg md:text-xl">
            {user.posts.length ?? 0}
          </h1>
          <p>Posts</p>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="font-bold text-lg md:text-xl">
            {user.followings.length ?? 0}
          </h1>
          <p>Following</p>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="font-bold text-lg md:text-xl">
            {user.followers.length ?? 0}
          </h1>
          <p>followers</p>
        </div>
      </div>

      <hr className="w-full h-[1px] mx-auto my-2 bg-border border-0 rounded-sm"></hr>

      <div className="flex flex-col gap-2 justify-start w-full">
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" />
          <span>{user.location ?? "No Location!"}</span>
        </p>

        <p className="flex items-center gap-2 text-muted-foreground">
          <LinkIcon className="size-4" />
          <span>{user.website ?? "No Website!"}</span>
        </p>

        <p className="flex items-center gap-2 text-muted-foreground">
          <Calendar1 className="size-4" />
          <span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Profile;
