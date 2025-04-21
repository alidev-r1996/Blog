
import { LogoutUser } from "@/lib/actions/user-action";
import { Power  } from "lucide-react";

const SignoutButton = () => {
  return (
    <form action={LogoutUser} className="flex items-center gap-2 text-sm p-2 cursor-pointer hover:!text-rose-500  hover:bg-accent rounded-r hover:font-bold transition-colors duration-300">
      <button type="submit" className="flex gap-2 items-center">
      <Power  className="size-5 hover:text-rose-500" />
      <span>Logout</span>
      </button>
    </form>
  );
};

export default SignoutButton;
