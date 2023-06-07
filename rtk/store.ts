import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { rootReducers } from "./reducers"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "@react-native-async-storage/async-storage"

const persistConfig = {
    storage,
    key: "runchit-persist",
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const appDispatch = () => useDispatch<AppDispatch>()

export const selector: TypedUseSelectorHook<RootState> = useSelector