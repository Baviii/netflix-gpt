// src/app/test/page.tsx
export default async function TestPage() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  const data = await res.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
