import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import configReducer from "./configSlice";
import gptReducer from "./gptSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "config"], // only these reducers will be persisted
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedConfigReducer = persistReducer(persistConfig, configReducer);

export const appStore = configureStore({
  reducer: {
    user: persistedUserReducer,
    config: persistedConfigReducer,
    movies: gptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
