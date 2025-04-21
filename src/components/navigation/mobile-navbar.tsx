import { Button } from "@/components/ui/button";
import {
  BellIcon,
  HomeIcon,
  UserIcon,
  AlignJustify,
  BellRing,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { userAction } from "@/lib/actions/user-action";
import SignoutButton from "./singout";

const MobileNavBar = async ({
  unread,
  userId,
}: {
  unread: boolean;
  userId: string | null | undefined;
}) => {
  const user = await userAction();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <p className=" hover:bg-primary hover:text-secondary transition-all duration-300 cursor-pointer rounded p-1">
          <AlignJustify className="size-5" />
        </p>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-6">Menu</SheetTitle>

          {!userId && (
            <Link href={"/login"}>
              <Button
                asChild
                className="w-max cursor-pointer hover:animate-bounce"
              >
                <span>Sign In</span>
              </Button>
            </Link>
          )}

          <nav className="flex flex-col gap-5 mt-5 [&>a]:hover:border-l-2 [&>a]:hover:border-primary [&>a]:hover:bg-accent  [&>a]:hover:text-accent-foreground [&>a]:rounded-r [&>a]:hover:font-bold">
            <Link
              href={"/"}
              className="flex items-center gap-1 text-sm p-2 cursor-pointer"
            >
              <HomeIcon className="size-5" />
              <span>Home</span>
            </Link>
            <Link
              href={"/notifications"}
              className="flex items-center gap-1 text-sm p-2 cursor-pointer"
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
              className="flex items-center gap-1 text-sm p-2 cursor-pointer"
            >
              <UserIcon className="size-5" />
              <span>Profile</span>
            </Link>
            {user && <SignoutButton />}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
