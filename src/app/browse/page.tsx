import React from "react";
// import Header from "../component/Header";
import { options } from "@/utils/constant";
import BannerSection from "../component/BannerSection";
import MovieWrapper from "../component/MovieWrapper";
import ClientHeaderWrapper from "../component/ClientHeaderWrapper";
import GptSearchWrapper from "../component/GptSearchWrapper";

async function fetchMovies(endpoint: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}`,
      options
    );
    if (!res.ok) {
      console.error("Failed response", res.status, await res.text());
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export default async function page() {
  const [nowPlaying, popularMovie, topRated, upcoming] = await Promise.all([
    fetchMovies("now_playing"),
    fetchMovies("popular"),
    fetchMovies("top_rated"),
    fetchMovies("upcoming"),
  ]);

  return (
    <>
      <ClientHeaderWrapper />
      <GptSearchWrapper />
      <BannerSection movieList={nowPlaying.results} />
      <MovieWrapper
        nowPlaying={nowPlaying.results}
        popularMovie={popularMovie.results}
        topRated={topRated.results}
        upcoming={upcoming.results}
      />
    </>
  );
}
