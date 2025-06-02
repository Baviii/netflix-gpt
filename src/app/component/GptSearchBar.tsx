import { options } from "@/utils/constant";
import { addGptMovies, movieName } from "@/utils/gptSlice";
import { lang } from "@/utils/langConstant";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type LangKey = keyof typeof lang;

export default function GptSearchBar() {
  const dispatch = useDispatch();
  const searchText = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const langKey = useSelector(
    (store: { config: { lang: LangKey } }) => store.config.lang
  );

  const searchMovies = async (movieName: string) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movieName
      )}&include_adult=false&language=en-US&page=1&api_key=448c7536e9410c797f1bd5eaced842f1`,
      options
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    if (!searchText.current?.value) return;

    setLoading(true);
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery: searchText.current.value }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      console.log("Movie recommendations:", data.movies);
      const movieList = data.movies.split(",");
      const promiseArray = movieList.map(
        async (movie: string) => await searchMovies(movie)
      );
      const tmdbList = await Promise.all(promiseArray);

      dispatch(addGptMovies(tmdbList));
      dispatch(movieName(movieList));

      console.log({ tmdbList }, { promiseArray });
      console.log({ movieList });
      // Handle the movie recommendations here
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGptSearch();
      }}
    >
      <div className="sm:mt-8 flex gap-2 justify-center items-center bg-black p-4 rounded-sm shadow-md">
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].placeholder}
          className="w-full lg:min-w-[420px] h-[48px] px-3 py-[12px] rounded-[12px] border border-[1.5px] border-lightgray outline-none transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0px_0px_20px_-18px] hover:border-[2px] hover:border-lightgray hover:shadow-[0px_0px_20px_-17px] text-white active:scale-95 focus:border-[2px] focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm cursor-pointer font-semibold text-13 px-3 py-[12px] bg-red-700 text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : lang[langKey].searchText}
        </button>
      </div>
    </form>
  );
}
