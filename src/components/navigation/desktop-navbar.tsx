import {
  BellIcon,
  HomeIcon,
  BellRing,
  ChevronDown,
  UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignoutButton from "./singout";

const DesktopNavBar = async ({
  unread,
  userId,
}: {
  unread: boolean;
  userId: string | null | undefined;
}) => {
  return (
    <nav className="md:flex items-center gap-6 hidden">
      <Link
        href={"/"}
        className="flex items-center gap-1 text-sm  hover:-translate-y-1 transition-all duration-200"
      >
        <HomeIcon className="size-5" />
        <span>Home</span>
      </Link>
      <Link
        href={"/notifications"}
        className="flex items-center gap-1 text-sm relative  hover:-translate-y-1 transition-all duration-200"
      >
        {!userId || unread == false ? (
          <BellIcon className="size-5" />
        ) : (
          <BellRing className="size-5 fill-primary animate-pulse notfiyPulse" />
        )}
        <span>Notification</span>
      </Link>

      {!userId ? (
        <Link href={"/login"}>
          <Button asChild>
            <span>Sign In</span>
          </Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-1 text-sm  hover:-translate-y-1 transition-all duration-200 bg-slate-900 text-white rounded shadow px-3 py-1">
              <span>Profile</span>
              <ChevronDown className="size-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
              <Link
                href={`/profile/${userId}`}
                className="flex items-center gap-2 text-sm p-2 cursor-pointer  hover:bg-accent rounded-r hover:font-bold transition-colors duration-300"
              >
                <UserIcon className="size-5" />
                <span>Profile</span>
              </Link>
            
            
              <SignoutButton />
           
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default DesktopNavBar;
