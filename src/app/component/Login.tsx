import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
// import Image from "next/image";

export default function Login() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen w-full overflow-hidden"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg')",
        }}
      >
        <Header />
        <div className="flex justify-center items-center ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
