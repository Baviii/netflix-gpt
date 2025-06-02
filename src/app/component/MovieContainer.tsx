import { MovieList } from "@/utils/movieData";
import React from "react";
import MovieCard from "./MovieCard";

export default function MovieContainer({
  movieList,
  title,
}: {
  movieList: MovieList[];
  title: string;
}) {
  console.log({ movieList });

  return (
    <div className="flex flex-col gap-3">
      <span className="text-20 font-bold text-white mt-3">{title}</span>
      <div className="flex overflow-x-scroll gap-3">
        {movieList.map((movie) => {
          return (
            <div className="shrink-0" key={movie.id}>
              <MovieCard poster={movie.poster_path} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
