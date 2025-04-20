import { ModeToggle } from "@/components/theme-Toggle";
import DesktopNavBar from "./desktop-navbar";
import MobileNavBar from "./mobile-navbar";
import { getNotification } from "@/lib/actions/notfication-action";
import { GetUserId } from "@/lib/actions/user-action";


export type notificationType = Awaited<ReturnType<typeof getNotification>>

const NavBar = async() => {
  const notifications = await getNotification();
  const unread: boolean = notifications.filter((notification) => notification.read == false).length > 0;
  const userId = await GetUserId();

    return ( 
        <header className="p-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow border-b">
        <h1 className="text-3xl font-black text-primary tracking-wide">Socially</h1>
        <div className="flex items-center gap-6">
          <ModeToggle />
          <DesktopNavBar unread={unread} userId={userId}/>
          <MobileNavBar unread={unread} userId={userId}/>
        </div>
      </header>
     );
}
 
export default NavBar;



