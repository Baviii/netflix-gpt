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
  // const dispatch = useDispatch();
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

  const handleGptSearch = () => {
    const currentUrl = new URL(window.location.href); // Get the current URL
    const searchParams = currentUrl.searchParams;
    console.log(currentUrl.searchParams, "current");
    // Add or update the query parameter
    searchParams.set("gptSearch", "true");
    console.log({ searchParams });

    // Update the URL without reloading the page
    router.replace(`${currentUrl.pathname}?${searchParams.toString()}`);
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
      <div className="flex gap-1.5">
        <button
          className="rounded-sm cursor-pointer font-semibold text-13 py-1 px-3 bg-red-400 text-white"
          onClick={handleGptSearch}
        >
          GPT Search
        </button>
        {user !== null ? (
          <button
            className="text-white cursor-pointer font-semiBold text-13 py-1 px-3 bg-[#E50914] rounded-sm"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        ) : null}
      </div>
    </div>
  );
}
