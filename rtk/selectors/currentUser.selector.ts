import { RootState } from "@rtk/store"

export const selectUserState = (state: RootState) => state.currentUsers
export const selectCurrentRole = (state: RootState) => state.currentUsers.userData?.currentRole
export const selectCurrentUser = (state: RootState) => state.currentUsers.userData