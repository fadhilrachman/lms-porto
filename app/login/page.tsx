"use client"

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { nextAuthSignIn } from "@/lib/server-action/next-auth-actions"; // Impor Server Action

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();

    if (email.length === 0 || password.length == 0) {
      return;
    }

    const response = await nextAuthSignIn({ email: email, password: password });

    if (response?.redirect) {
      console.log('REDIRECT !');
      
      router.push(response.redirect);
    } else if (response?.error) {
      setErrorMessage(response.error);
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='border-2 border-white rounded-xl p-10'>
        <p className='text-2xl font-semibold text-white'>Login</p>
        <div className='h-8'></div>
        <p className='text-md font-semibold text-white'>Email</p>
        <input className='h-10 w-full px-4 border-2 border-white rounded-md text-md font-semibold text-white' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className='h-8'></div>
        <p className='text-md font-semibold text-white'>Password</p>
        <div className='flex flex-row gap-5'>
          <input className='h-10 w-full px-4 border-2 border-white rounded-md text-md font-semibold text-white' type={ visible ? 'text' : 'password' } value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='w-28 rounded-md bg-blue-600 text-white' onClick={() => setVisible(!visible)}>{ visible ? 'Hide' : 'Show' }</button>
        </div>
        <div className='h-8'></div>
        <button className='w-28 h-10 rounded-md bg-blue-600 text-white' onClick={onSubmitHandler}>Login</button>
      </div>
    </div>
  )
}
