import { getStoresAPI } from "@api/store.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IModelRunchit } from "@typings/models.d";
import axios from "axios";

interface IInitialState {
    currentStore: IModelRunchit | null
    stores: Array<IModelRunchit>
    loading: boolean;
}

const initialState: IInitialState = {
    currentStore: null,
    stores: [],
    loading: true
}

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => await getStoresAPI())

const storeSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        setCurrentStore(action, { payload }: { payload: IModelRunchit | null }) {
            action.loading = false
            action.currentStore = payload
        },
        setStores(action, { payload }: { payload: IModelRunchit[] | null }) {
            action.loading = false
            action.stores = payload ?? []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStores.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStores.fulfilled, (state, { payload }) => {
            state.stores = payload ?? []
            state.currentStore = payload[0] ?? null
            state.loading = false
        })
        builder.addCase(fetchStores.rejected, state => {
            state.loading = false
        })
    }
})

export const { setCurrentStore, setStores } = storeSlice.actions;

export default storeSlice.reducer;
