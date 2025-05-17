import { options } from "@/utils/constant";
import { videoData } from "@/utils/movieData";
import React from "react";

async function getTrailer(id: number) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    options
  );
  const res = await data.json();
  const filteredData = res.results.filter(
    (video: videoData) => video.type === "Trailer"
  );
  const trailer = filteredData.length ? filteredData[0] : res.results[0];
  return trailer;
}
export default async function VideoBackground({ id }: { id: number }) {
  const videoTrailer = await getTrailer(id);

  return (
    <div>
      <iframe
        className="w-screen aspect-video "
        src={`https://www.youtube.com/embed/${videoTrailer.key}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
