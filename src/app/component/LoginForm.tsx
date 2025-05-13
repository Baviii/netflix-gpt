"use client";
// import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginForm() {
  const [signInForm, setSigmnInForm] = useState(true);
  return (
    <div className="flex flex-col p-[56px] bg-[rgba(0,_0,_0,_0.7)] gap-2.5 w-full lg:w-[500px] rounded-lg">
      <span className="text-[20px] font-bold text-white">
        {" "}
        {signInForm ? "Sign In" : "Sign Up"}
      </span>
      <form>
        <div className="flex flex-col gap-5 ">
          <input
            type="email"
            placeholder="Email or phone number"
            className="p-2.5 rounded-md bg-[rgba(0,_0,_0,_0.7)] text-gray-100 border border-gray-500 outline-none"
          />
          {!signInForm ? (
            <input
              type="text"
              placeholder="Name"
              className="p-2.5 rounded-md bg-[rgba(0,_0,_0,_0.7)] text-gray-100 border border-gray-500 outline-none"
            />
          ) : null}
          <input
            type="password"
            placeholder="Password"
            className="p-2.5 rounded-md bg-red text-gray-100 border border-gray-500 outline-none"
          />
          <button className="bg-[#e50914] text-white p-2.5 rounded-md font-bold cursor-pointer">
            {signInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex gap-1">
            <span className="text-16 text-[rgba(255,_255,_255,_0.7)] font-normal">
              {signInForm ? "New to Netflix ?" : "Already have an account ?"}
            </span>
            <Link
              onClick={() => setSigmnInForm(!signInForm)}
              href={""}
              className="text-white font-medium"
            >
              {signInForm ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
