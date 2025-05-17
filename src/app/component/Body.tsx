"use client";
import React, { useEffect } from "react";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/utils/userSlice";
import { useRouter } from "next/navigation";

export default function Body() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          addUser({ uuid: uid, displayName: displayName, email: email })
        );
        router.push("/browse");
        // ...
      } else {
        dispatch(removeUser());
        router.push("/");
      }
    });
    //it will unsubscirbe when component unmount
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Login />
    </>
  );
}
