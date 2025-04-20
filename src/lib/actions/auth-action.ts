"use server";

import { signIn } from "@/auth";


export async function LoginCredentials(formData: FormData) {
  const {name, email, password} = Object.fromEntries(formData.entries());
  if(email && password){
    await signIn("credentials", {name, email, password}, { callbackUrl: "/" })
  }else{
    throw new Error("Invalid Email or Password!");
  }
}


export async function LoginGoogle() {
  const user = await signIn("google", { callbackUrl: "/" });
  console.log(user, "google signin action")
}

export async function LoginGithub() {
  await signIn("github", { callbackUrl: "/" });
}