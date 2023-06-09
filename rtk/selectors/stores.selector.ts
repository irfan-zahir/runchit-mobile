import { RootState } from "@rtk/store"

export const selectStoreState = (state: RootState) => state.stores
export const selectStores = (state: RootState) => state.stores.stores
export const selectCurrentStore = (state: RootState) => state.stores.selected