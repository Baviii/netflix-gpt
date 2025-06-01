"use client";

import React, { useEffect, useState } from "react";
import { options } from "@/utils/constant";
import BannerSection from "../component/BannerSection";
import MovieWrapper from "../component/MovieWrapper";
import ClientHeaderWrapper from "../component/ClientHeaderWrapper";
import GptSearchWrapper from "../component/GptSearchWrapper";
import { MovieList } from "@/utils/movieData";
import { useSearchParams } from "next/navigation";

interface MovieData {
  results: MovieList[];
}

async function fetchMovies(endpoint: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}?api_key=448c7536e9410c797f1bd5eaced842f1`,
      {
        ...options,
        cache: "no-store",
        next: { revalidate: 0 },
      }
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

export default function Page({ params }: { params: { gptSearch: string } }) {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<{
    nowPlaying: MovieData | null;
    popularMovie: MovieData | null;
    topRated: MovieData | null;
    upcoming: MovieData | null;
  }>({
    nowPlaying: null,
    popularMovie: null,
    topRated: null,
    upcoming: null,
  });
  const [loading, setLoading] = useState(true);
  const showGptSearch = searchParams.get("gptSearch") === "true";
  console.log(showGptSearch, "showGptSearch", params);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [nowPlaying, popularMovie, topRated, upcoming] =
          await Promise.all([
            fetchMovies("now_playing"),
            fetchMovies("popular"),
            fetchMovies("top_rated"),
            fetchMovies("upcoming"),
          ]);

        setMovies({
          nowPlaying,
          popularMovie,
          topRated,
          upcoming,
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (
    !movies.nowPlaying ||
    !movies.popularMovie ||
    !movies.topRated ||
    !movies.upcoming
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Failed to load movies
      </div>
    );
  }

  return (
    <>
      <ClientHeaderWrapper />

      {showGptSearch ? (
        <GptSearchWrapper />
      ) : (
        <>
          <BannerSection movieList={movies.nowPlaying.results} />
          <MovieWrapper
            nowPlaying={movies.nowPlaying.results}
            popularMovie={movies.popularMovie.results}
            topRated={movies.topRated.results}
            upcoming={movies.upcoming.results}
          />
        </>
      )}
    </>
  );
}
