import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movieName: [],
  },
  reducers: {
    addGptMovies: (state, action) => {
      state.movies = action.payload;
    },
    movieName: (state, action) => {
      state.movieName = action.payload;
    },
  },
});

export const { addGptMovies, movieName } = gptSlice.actions;
export default gptSlice.reducer;
