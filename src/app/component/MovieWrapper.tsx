import React from "react";
import MovieContainer from "./MovieContainer";
import { MovieList } from "@/utils/movieData";

export default function MovieWrapper({
  nowPlaying,
  popularMovie,
  topRated,
  upcoming,
}: {
  nowPlaying: MovieList[];
  popularMovie: MovieList[];
  topRated: MovieList[];
  upcoming: MovieList[];
}) {
  console.log({ topRated });
  return (
    <div className="bg-black flex flex-col gap-7 px-8">
      <div className="-mt-52 relative z-20">
        <MovieContainer movieList={nowPlaying} title="Now Playing" />
        <MovieContainer movieList={popularMovie} title="Popular Movies" />
        <MovieContainer movieList={topRated} title="Top Rated" />
        <MovieContainer movieList={upcoming} title="Upcoming" />
      </div>
    </div>
  );
}
