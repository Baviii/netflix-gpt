/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// Adjust the path to your store file

export default function Header() {
  const router = useRouter();

  const user = useSelector((store: any) => store.user);
  console.log({ user });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("here");
        router.push("/"); // client side navigation
      })
      .catch((error) => {
        console.log("here1");
        toast.error(error.message || "Sign out failed");
      });
  };

  return (
    <div className="bg-gradient-to-b from-black px-6 py-3 lg:px-8 lg:py-4 w-full justify-between flex">
      <div className="flex items-center w-fit">
        <Image
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="netflix-logo"
          width={148}
          height={40}
          className="w-[89px] h-[24px] lg:w-[148px] lg:h-[40px]"
        />
      </div>
      {user !== null ? (
        <button
          className="text-white cursor-pointer font-semiBold text-13 py-1 px-3 bg-[#E50914] rounded-sm"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      ) : null}
    </div>
  );
}
