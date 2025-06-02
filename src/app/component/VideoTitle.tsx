import React from "react";

export default function VideoTitle({
  title,
  overview,
}: {
  title: string;
  overview: string;
}) {
  return (
    <div className="flex flex-col w-full gap-2 lg:w-screen aspect-video absolute bg-gradient-to-r from-black px-36 pt-[20%]">
      <span className="hidden lg:block text-3xl font-extrabold text-white">
        {title}
      </span>
      <span className="hidden lg:block text-13 text-white w-full lg:w-[40%]">
        {overview}
      </span>
      <div className="hidden lg:flex gap-1.5 ">
        <button className="p-2.5 rounded-sm bg-white text-black cursor-pointer text-14 hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="p-2.5 rounded-sm bg-gray-400 text-white cursor-pointer text-14">
          More info !
        </button>
      </div>
    </div>
  );
}
