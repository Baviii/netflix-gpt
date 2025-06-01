import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { Bg_Image } from "@/utils/constant";

export default function GptSearchWrapper() {
  return (
    <div
      className="  w-full flex flex-col items-center p-8"
      style={{
        backgroundImage: `url(${Bg_Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // ensure full screen
      }}
    >
      <GptSearchBar />

      <div
        className="overflow-y-auto w-full  mt-4 bg-black opacity-90"
        style={{
          maxHeight: "70vh", // Adjust as needed
        }}
      >
        <GptMovieSuggestion />
      </div>
    </div>
  );
}
