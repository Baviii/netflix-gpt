"use client";
import React from "react";
import MovieContainer from "./MovieContainer";
// import { MovieList } from "@/utils/movieData";
// import MovieWrapper from "./MovieWrapper";

export default function GptMovieSuggestion({
  movies,
  movieName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any[];
  movieName: string[];
}) {
  if (!movies) return null;
  console.log({ movies }, { movieName });
  return (
    <div className="p-4 m-4">
      {movieName.map((movie: string, index: number) => (
        <MovieContainer key={movie} title={movie} movieList={movies[index]} />
      ))}
    </div>
  );
}
