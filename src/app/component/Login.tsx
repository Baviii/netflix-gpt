import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import { Bg_Image } from "@/utils/constant";
// import Image from "next/image";

export default function Login() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen w-full overflow-hidden"
        style={{
          backgroundImage: `url(${Bg_Image})`,
        }}
      >
        <Header />
        <div className="sm:mt-[50%] flex justify-center items-center lg:mt-[10%]">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
