import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { MovieList } from "@/utils/movieData";

export default function BannerSection({
  movieList,
}: {
  movieList: MovieList[];
}) {
  const bannerMovie = movieList[0];
  const { original_title, overview, id } = bannerMovie;

  return (
    <>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground id={id} />
    </>
  );
}
