"use client";
import React from "react";
import { useSelector } from "react-redux";
import MovieContainer from "./MovieContainer";
import { RootState } from "@/utils/appStore";
// import MovieWrapper from "./MovieWrapper";

export default function GptMovieSuggestion() {
  const movies = useSelector((store: RootState) => store.movies.movies);
  const movieName = useSelector((store: RootState) => store.movies.movieName);

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
