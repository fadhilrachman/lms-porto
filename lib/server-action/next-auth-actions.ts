/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn, signOut } from "@/auth";
import { executeAction } from "@/lib/execute-action";

interface NextAuthBody {
  email: string;
  password: string;
}

export async function nextAuthSignIn(nextAuthBody: NextAuthBody) {
  try {
    const response = await executeAction({
      actionFn: async () => {
        await signIn("credentials", {
          email: nextAuthBody.email,
          password: nextAuthBody.password,
          redirect: false
        });
      },
    });

    if (response.success) {
      console.log('AUTH ACTION: Redirect');
      
      return { redirect: '/profile/course' }; // Mengembalikan lokasi redirect
    } else {
      return { error: 'Login failed' };
    }
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function nextAuthSignOut() {
  await signOut();
}
