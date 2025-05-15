"use client";
// import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "react-toastify";
const passwordSchema = z
  .string()
  .min(6, "Min 6 character is required")
  .refine((val) => /[a-z]/.test(val), {
    message: "Minimum 1 lowercase is required",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Minimum 1 uppercase is required",
  })
  .refine((val) => /\d/.test(val), {
    message: "Minimum 1 number is required",
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Must include at least one special character",
  });
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});
type SignInFormType = z.infer<typeof signInSchema>;
type SignUpFormType = z.infer<typeof signUpSchema>;
type CombinedFormType = SignInFormType | SignUpFormType;

export default function LoginForm() {
  const [signInForm, setSigmnInForm] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<CombinedFormType>({
    resolver: zodResolver(signInForm ? signInSchema : signUpSchema),
  });
  const onSubmit = (data: CombinedFormType) => {
    console.log(signInForm ? "Sign In Data" : "Sign Up Data", data);
    if (signInForm) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Signed in Sucessfully!");
          console.log({ user });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(` ${errorMessage}`);
        });
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.success("Signed up Sucessfully!");
          console.log({ user });
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(` ${errorMessage}`);
          // ..
        });
    }
    reset();
  };
  return (
    <div className="flex flex-col p-[56px] bg-[rgba(0,_0,_0,_0.7)] gap-2.5 w-full lg:w-[500px] rounded-lg">
      <span className="text-[20px] font-bold text-white">
        {" "}
        {signInForm ? "Sign In" : "Sign Up"}
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 ">
          <input
            {...register("email")}
            type="email"
            placeholder="Email or phone number"
            className="p-2.5 rounded-md bg-[rgba(0,_0,_0,_0.7)] text-gray-100 border border-gray-500 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message as string}
            </span>
          )}
          {!signInForm ? (
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="p-2.5 rounded-md bg-[rgba(0,_0,_0,_0.7)] text-gray-100 border border-gray-500 outline-none"
            />
          ) : null}
          {!signInForm && "name" in errors && errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message as string}
            </span>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2.5 rounded-md bg-red text-gray-100 border border-gray-500 outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message as string}
            </span>
          )}
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
