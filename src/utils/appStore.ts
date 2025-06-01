import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import configReducer from "./configSlice";
import gptReducer from "./gptSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
    movies: gptReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
