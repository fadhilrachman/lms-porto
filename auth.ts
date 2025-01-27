import NextAuth from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
// import Cookies from "js-cookie";
// const myCookie = Cookies.get(process.env.COOKIE_NAME as string);
// const myCookie = Cookies.get("authjs.session-token");

import { fetcher } from "@/lib/fetcher";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // DAPATKAN KREDENSIAL DARI FORM LOGIN
        console.log("CREDENTIAL =", credentials);

        // TIDAK JALAN HASIL IMPORT AXIOS
        // console.log("BASE URL =", fetcher.defaults.baseURL);
        // const res = await fetcher.post("/auth/login", {
        //   email: credentials?.email,
        //   password: credentials?.password,
        // });

        // fetcher.interceptors.request.use(
        //   async (config) => {
        //     const accessToken = Cookies.get("authjs.session-token");
        //     console.log('COOKIES TOKEN=', accessToken);

        //     if (accessToken != null && accessToken.length != 0) {
        //       config.headers.Authorization = `Bearer ${accessToken}`;

        //       return config;
        //     }

        //     return config;
        //   },
        //   (error) => Promise.reject(error)
        // );

        // BUAT AXIOS TERPISAH JALAN
        console.log("BASE URL =", process.env.VERCEL_URL);
        const res = await axios.post(
          `${process.env.VERCEL_URL}/api/auth/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
        );

        console.log("RES DATA =", res.data);
        const { token } = res.data;

        fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // const user = await res.json();
        // console.log("USER =", user);

        // If no error and we have user data, return it
        console.log("RES STATUS=", res.status);
        if (res.status == 200) {
          // return user;
          return {
            id: "",
            email: credentials.email,
            name: "",
            role: "",
            accessToken: token,
          };
        }

        // Return null if user data could not be retrieved\rules\require-await
        return null;
      },
    }),
  ],
  basePath: "/auth",
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, session, account, user }) {
      console.log("jw user =", user);

      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log('ses session =', session);
      // console.log('ses token =', token);
      // console.log('ses user =', user);

      session.accessToken = token.accessToken;
      session.user.role = token.role;

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}
