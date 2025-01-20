import NextAuth from "next-auth"
import "next-auth/jwt"
import Credentials from "next-auth/providers/credentials";

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
        console.log("CREDENTIAL =", credentials);

        const res = await fetch("https://forum-api.dicoding.dev/v1/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        console.log("USER =", user);
                
        // If no error and we have user data, return it
        if (res.ok && user) {
          // return user;
          return {
            id: "1",
            email: credentials.email,
            name: "Sung Jin Woo",
            role: "ADMIN",
            accessToken: user?.data?.token
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
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
  
  interface User {
    accessToken?: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    role?: string
  }
}
