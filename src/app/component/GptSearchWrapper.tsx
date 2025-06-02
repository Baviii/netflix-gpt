import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { Bg_Image } from "@/utils/constant";
import { RootState } from "@/utils/appStore";
import { useSelector } from "react-redux";

export default function GptSearchWrapper() {
  const movies = useSelector((store: RootState) => store.movies.movies);
  const movieName = useSelector((store: RootState) => store.movies.movieName);
  console.log("check", movieName, movies);
  return (
    <div
      className="  w-full flex flex-col items-center p-8"
      style={{
        backgroundImage: `url(${Bg_Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // ensure full screen
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9,
      }}
    >
      <GptSearchBar />
      {movies.length ? (
        <div
          className="overflow-y-auto w-full  mt-4 bg-black opacity-90"
          style={{
            maxHeight: "70vh", // Adjust as needed
          }}
        >
          <GptMovieSuggestion movies={movies} movieName={movieName} />
        </div>
      ) : null}
    </div>
  );
}
