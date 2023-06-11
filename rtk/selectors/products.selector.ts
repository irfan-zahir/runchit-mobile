import { RootState } from "@rtk/store"

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsState = (state: RootState) => state.products