/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Netflix_Logo } from "@/utils/constant";
import { supportedLang } from "@/utils/langConstant";
import { chooseLang } from "@/utils/configSlice";
import { addUser, removeUser } from "@/utils/userSlice";
// import { toggleGptSearchView } from "@/utils/gptSlice";
// Adjust the path to your store file

export default function Header() {
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);
  const searchParams = useSearchParams();
  const showGptSearch = searchParams.get("gptSearch") === "true";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message || "Sign out failed");
      });
  };

  const handleGptSearch = () => {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;

    const isGptSearch = searchParams.get("gptSearch") === "true";

    if (isGptSearch) {
      searchParams.delete("gptSearch");
    } else {
      searchParams.set("gptSearch", "true");
    }

    router.replace(`${currentUrl.pathname}?${searchParams.toString()}`);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    dispatch(chooseLang(selectedId));
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
        {showGptSearch ? (
          <div className="relative z-10">
            <select
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
              onChange={handleLangChange}
            >
              {supportedLang.map((item) => (
                <option key={item.id} className="bg-red-400" value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {user && user.uid ? (
          <button
            className="sm:py-2 sm:px-2 rounded-sm cursor-pointer font-semibold text-13 lg:py-1 lg:px-3 bg-red-400 text-white w-[203px]"
            onClick={handleGptSearch}
          >
            {!showGptSearch ? "GPT Search" : "Home page"}
          </button>
        ) : null}
        {user && user.uid ? (
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
