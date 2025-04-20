import Link from "next/link";
import { Button } from "../ui/button";

const UnAuthenticatedSideBar = () => {
  return (
    <aside className="border rounded shadow flex flex-col items-center gap-4 p-4 sticky top-20">
      <h1 className="text-2xl font-bold text-primary">Welcome Back!</h1>
      <p className="text-muted-foreground text-center">
        Login to access your Profile and connect with others
      </p>
      <div className="flex flex-col gap-4 w-full ">
        <Link href="/login">
          <Button
            variant={"outline"}
            className="w-full !pointer-events-auto !cursor-pointer"
          >
            <span>Login</span>
          </Button>
        </Link>
        <Link href="/login">
          <Button className="w-full !pointer-events-auto !cursor-pointer">
            <span>Sign Up</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default UnAuthenticatedSideBar;
