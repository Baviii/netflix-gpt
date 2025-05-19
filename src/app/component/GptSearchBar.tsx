import React from "react";

export default function GptSearchBar() {
  return (
    <form>
      <div className="flex gap-1.5">
        <input
          type="text"
          placeholder="What type of movie do you like to watch?"
          className=""
        />
        <button className="rounded-sm cursor-pointer font-semibold text-13 py-1 px-3 bg-red-400 text-white">
          Search
        </button>
      </div>
    </form>
  );
}
