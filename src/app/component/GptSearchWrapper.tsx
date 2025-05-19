"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";

export default function GptSearchWrapper() {
  const searchParams = useSearchParams();
  const gptSearch = searchParams.get("gptSearch");

  return (
    <>
      {gptSearch === "true" && (
        <>
          <GptSearchBar />
          <GptMovieSuggestion />
        </>
      )}
    </>
  );
}
