import { fetchProductsAPI } from "@api/product.api";
import { getUserAPI } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IProductModel, IStoreModel } from "@typings/models.d";

interface IInitialState {
    products: IProductModel[]
    loading: boolean;
}

const initialState: IInitialState = {
    products: [],
    loading: true
}

export const fetchProducts = createAsyncThunk("store/fetchProducts", async () => await fetchProductsAPI())

const usersSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProducts: (action, { payload }: { payload: IProductModel }) => {
            const persisted = [...action.products]
            const index = persisted.indexOf(payload)
            const outdated = persisted.splice(index, 1, payload)
            action.products = persisted
            action.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, { payload, ...pape }) => {
            state.products = payload
            state.loading = false
        })
        builder.addCase(fetchProducts.rejected, state => {
            state.loading = false
        })
    }
})

export const { updateProducts } = usersSlice.actions;

export default usersSlice.reducer;
