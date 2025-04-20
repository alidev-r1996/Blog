import { MapPin, Link as LinkIcon } from "lucide-react";
import { userAction } from "@/lib/actions/user-action";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const AuthenticatedSideBar = async() => {
  const user = await userAction();
    
   if (user == null) return null;
   return ( 
    <aside className="border rounded shadow flex flex-col items-center gap-4 p-4 sticky top-20">
     <Avatar className="size-20 border shadow">
      {user.img && <AvatarImage src={user.img} alt="@shadcn"/>}
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

    <hr className="w-full h-[1px] mx-auto my-2 bg-border border-0 rounded-sm"></hr>

    <div className="flex items-center justify-between w-full ">
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
      
    </div>
  </aside>
 )
}
 
export default AuthenticatedSideBar;