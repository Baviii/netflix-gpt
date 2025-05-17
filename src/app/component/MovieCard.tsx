import { movieImage } from "@/utils/constant";
import Image from "next/image";
import React from "react";

export default function MovieCard({ poster }: { poster: string }) {
  return (
    <div className="w-[200px]">
      <Image
        src={movieImage + poster}
        alt="movie-card"
        width={200}
        height={200}
        className="rounded-md object-cover"
      />
    </div>
  );
}
