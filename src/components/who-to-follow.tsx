import { suggestionUser } from "@/lib/actions/user-action";
import FollowButton from "./followButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const WhoToFollow = async () => {
  const users = (await suggestionUser()) || null;

  if (users == null) return null;

  return (
    <div className="hidden md:block md:col-span-4 w-full  p-4 border rounded shadow h-max sticky top-20">
      <h1 className="font-bold text-2xl text-primary mb-6">Who To Follow</h1>
      <div className="flex flex-col gap-3">
        {users?.follow?.map(({id,name,img,username,followers}) => {
          return (
            <div
              key={id}
              className="flex items-center gap-1 justify-between"
            >
              <Link href={`/profile/${id}`} className="flex items-center gap-1 cursor-pointer">
                <Avatar className="size-14 shadow border">
                  {img && <AvatarImage src={img} alt="@shadcn" />}
                  <AvatarFallback>{name?.split("")[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <h1 className="font-bold ">{name}</h1>
                  <p className="text-muted-foreground text-xs">
                    {username}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    followers {followers.length}
                  </p>
                </div>
              </Link>
              <FollowButton userID={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhoToFollow;
