import { combineReducers } from "@reduxjs/toolkit"
import userReducers from './slices/currentUser.slice'

export const rootReducers = combineReducers({
    currentUsers: userReducers
})