import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
// import Resend from "next-auth/providers/resend";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    // Resend,
    GitHub,
    Google,
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: { email: {}, password: {}, name: {} },
      authorize: async (credentials) => {
        let user = null;

        if (credentials) {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
              password: credentials.password as string,
            },
          });
        }

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        console.log(user, "use in authorize");
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/goodbye"
  },
  session: {
    strategy: "jwt", // ✅ this is faster than "database"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to homepage after login
      return "/";
    },
  },
});
