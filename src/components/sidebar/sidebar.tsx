import { userAction } from "@/lib/actions/user-action";
import UnAuthenticatedSideBar from "./unauth-sidebar";
import AuthenticatedSideBar from "./auth-sidebar";

const SideBar = async () => {
  const user = await userAction();

  if (!user) {
    return <UnAuthenticatedSideBar />;
  }
  return <AuthenticatedSideBar />;
};

export default SideBar;
