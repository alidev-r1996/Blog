import { BellIcon, HomeIcon, UserIcon, BellRing } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

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
      <Link
        href={`/profile/${userId}`}
        className="flex items-center gap-1 text-sm  hover:-translate-y-1 transition-all duration-200"
      >
        <UserIcon className="size-5" />
        <span>Profile</span>
      </Link>

      {!userId && (
        <Link href={"/login"}>
          <Button asChild>
            <span>Sign In</span>
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavBar;
