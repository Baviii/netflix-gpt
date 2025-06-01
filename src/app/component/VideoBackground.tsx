"use client";

import { options } from "@/utils/constant";
import { videoData } from "@/utils/movieData";
import React, { useEffect, useState } from "react";

async function getTrailer(id: number) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=448c7536e9410c797f1bd5eaced842f1`,
    options
  );
  const res = await data.json();
  console.log({ res });
  const filteredData = res.results?.filter(
    (video: videoData) => video.type === "Trailer"
  );
  const trailer = filteredData.length ? filteredData[0] : res.results[0];
  return trailer;
}

export default function VideoBackground({ id }: { id: number }) {
  const [videoTrailer, setVideoTrailer] = useState<videoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const trailer = await getTrailer(id);
        setVideoTrailer(trailer);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  if (loading || !videoTrailer) {
    return <div className="w-screen aspect-video bg-black" />;
  }

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${videoTrailer.key}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
