export interface MovieList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface videoData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  id: string;
  key: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
