

import { signOut } from "@/auth";
import { LogoutUser } from "@/lib/actions/user-action";
import { LogOut } from "lucide-react";

const SignoutButton = () => {
  return (
    <form action={LogoutUser} className="flex items-center gap-1 text-sm p-2 cursor-pointer hover:!text-rose-500 hover:border-l-2 hover:border-rose-500 hover:bg-accent rounded-r hover:font-bold transition-colors duration-300">
      <button className="flex items-center">
      <LogOut className="size-5" />
      <span>Logout</span>
      </button>
    </form>
  );
};

export default SignoutButton;
