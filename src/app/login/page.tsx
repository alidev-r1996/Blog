import InputText from "@/components/ui/InputText";
import {
  LoginCredentials,
  LoginGithub,
  LoginGoogle,
} from "@/lib/actions/auth-action";
import Link from "next/link";
import { BsGithub, BsGoogle } from "react-icons/bs";

export const SIGNUP_FORM = [
  {
    id: 1,
    name: "name",
    placeholder: "Enter Your Name",
    label: "Name",
  },
  {
    id: 2,
    name: "email",
    placeholder: "Enter Your Email",
    label: "email",
  },
  {
    id: 3,
    name: "password",
    placeholder: "Enter Your Password",
    label: "Password",
  },
];

export const SIGNIN_FORM = [
  {
    id: 1,
    name: "email",
    placeholder: "Enter Your Email",
    label: "Email",
  },
  {
    id: 2,
    name: "password",
    placeholder: "Enter Your Password",
    label: "Password",
  },
];

const SignIn = async () => {

  return (
    <div className="border rounded-lg shadow flex mx-auto flex-col gap-4 w-full md:w-[496px] p-4">
      <h1 className="font-bold text-2xl mt-4 text-center">Welcome</h1>

      <div className="flex items-center gap-1 md:p-6 p-2 text-xs text-slate-500">
        <form
          action={LoginGoogle}
          id="google"
          className="p-2 w-1/2  border border-slate-200 rounded-lg hover:bg-slate-100 transition-all duration-300 cursor-pointer"
        >
          <button
            type="submit"
            className="flex gap-2 text-sx md:text-sm whitespace-nowrap items-center mx-auto [&>svg]:text-orange-600 [&>svg]:size-6"
          >
            <BsGoogle /> Signin With Google
          </button>
        </form>
        <form
          action={LoginGithub}
          id="github"
          className="p-2 w-1/2  border border-slate-200 rounded-lg hover:bg-slate-100 transition-all duration-300 cursor-pointer "
        >
          <button
            type="submit"
            className="flex gap-2 text-sx md:text-sm whitespace-nowrap items-center mx-auto [&>svg]:text-slate-600 [&>svg]:size-6"
          >
            <BsGithub /> Signin With GitHub
          </button>
        </form>
      </div>

      <div className="flex items-center px-8 md:mt-4 md:-mb-3">
        <div className="w-full h-[1px] bg-slate-200"></div>
        <p className="text-sm text-slate-500 px-4">or</p>
        <div className="w-full h-[1px] bg-slate-200"></div>
      </div>

      <form
        action={LoginCredentials}
        id="creadentials"
        className="flex flex-col gap-4 text-sm p-6"
      >
        {SIGNIN_FORM.map((input) => (
          <InputText key={input.id} {...input} />
        ))}
        <button
          type="submit"
          className="w-full bg-slate-800 text-white p-2 font-bold rounded-lg mt-5 transition-all duration-300 cursor-pointer hover:shadow-[0_0_6px_rgba(0,0,0,0.5)]"
        >
          Sign In
        </button>
      </form>
      <Link href="/login/recover" className="text-center text-sm">
        Forget Your Password?{" "}
        <span className="text-slate-800 cursor-pointer font-bold hover:text-blue-500  transition-all duration-200">
          Recover
        </span>
      </Link>
    </div>
  );
};

export default SignIn;
