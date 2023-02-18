import { getProductsAPI } from "@api/product.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IModelProduct } from "@typings/models";

interface IInitialState {
    products: Array<IModelProduct>
    loading: boolean;
}

const initialState: IInitialState = {
    products: [],
    loading: true
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => await getProductsAPI())

const storeSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(action, { payload }: { payload: IModelProduct[] | null }) {
            action.loading = false
            action.products = payload ?? []
        },
        addProduct(action, { payload }: { payload: IModelProduct }) {
            action.loading = false
            const productStored = [...action.products, payload]
            action.products = productStored
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.products = payload ?? []
            state.loading = false
        })
        builder.addCase(fetchProducts.rejected, state => {
            state.loading = false
        })
    }
})

export const { setProducts, addProduct } = storeSlice.actions;

export default storeSlice.reducer;