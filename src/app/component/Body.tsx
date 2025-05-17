"use client";
import React, { useEffect } from "react";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/utils/userSlice";

export default function Body() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, displayName, email } = user;
        dispatch(
          addUser({ uuid: uid, displayName: displayName, email: email })
        );

        // ...
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <>
      <Login />
    </>
  );
}
