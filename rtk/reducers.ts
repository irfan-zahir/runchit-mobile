import { combineReducers } from "@reduxjs/toolkit"
import userReducers from './slices/currentUser.slice'
import storeReducers from './slices/store.slice'
import productsReducers from './slices/products.slice'

export const rootReducers = combineReducers({
    currentUsers: userReducers,
    stores: storeReducers,
    products: productsReducers
})