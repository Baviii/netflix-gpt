/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Netflix_Logo } from "@/utils/constant";
// Adjust the path to your store file

export default function Header() {
  const router = useRouter();

  const user = useSelector((store: any) => store.user);
  console.log({ user });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/"); // client side navigation
      })
      .catch((error) => {
        toast.error(error.message || "Sign out failed");
      });
  };

  return (
    <div className="bg-gradient-to-b from-black px-6 py-3 lg:px-8 lg:py-4 w-full justify-between flex absolute z-20">
      <div className="flex items-center w-fit">
        <Image
          src={Netflix_Logo}
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
