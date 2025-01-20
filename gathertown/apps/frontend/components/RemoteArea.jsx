"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const RemoteArea = () => {
  const router=useRouter();
  if(!localStorage.getItem("token")){
    router.push("/auth/sign-in")
  }
  return (
    <div>
        <h1>Existing spcaes</h1>
       remoete space
    </div>
  );
}

export default RemoteArea;
