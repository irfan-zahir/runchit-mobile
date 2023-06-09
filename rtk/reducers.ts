import { combineReducers } from "@reduxjs/toolkit"
import userReducers from './slices/currentUser.slice'
import sidebarReducers from './slices/sidebar.slice'
import storeReducers from './slices/stores.slice'
// import productsReducers from './slices/products.slice'

export const rootReducers = combineReducers({
    currentUsers: userReducers,
    sidebarState: sidebarReducers,
    stores: storeReducers,
    // products: productsReducers
})