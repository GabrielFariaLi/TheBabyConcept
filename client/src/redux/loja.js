import { configureStore, combineReducers } from "@reduxjs/toolkit";
import carrinhoReducer from "./carrinhoRedux";
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

const rootReducer = combineReducers({ utilizador: utilizadorReducer, carrinho: carrinhoReducer });

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