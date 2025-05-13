import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="bg-gradient-to-b from-black px-6 py-3 lg:px-8 lg:py-4 ">
      <div className="flex items-center">
        <Image
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="netflix-logo"
          width={148}
          height={40}
          className="w-[89px] h-[24px] lg:w-[148px] lg:h-[40px]"
        />
      </div>
    </div>
  );
}
