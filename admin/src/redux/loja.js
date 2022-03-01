import { configureStore, combineReducers } from "@reduxjs/toolkit";
import produtoReducer from "./produtoRedux";
import utilizadorReducer from "./utilizadorRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 

  utilizador: utilizadorReducer,
  produto: produtoReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const loja = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(loja);