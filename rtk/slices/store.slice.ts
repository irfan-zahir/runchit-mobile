import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IModelRunchit } from "@typings/models.d";
import axios from "axios";

interface IInitialState {
    stores: Array<IModelRunchit> | null
    loading: boolean;
}

const initialState: IInitialState = {
    stores: null,
    loading: true
}

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
    const res = await axios.get<Array<IModelRunchit>>("/store")
        .then(({ data }) => data)
    return res
})

const storeSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        // setCurrentUser: (action, { payload }: { payload: IModelUser | null }) => {
        //     action.loading = false
        //     action.stores = payload
        // },
        // removeCurrentUser(action, { payload }) {
        //     action.loading = false
        //     action.stores = null
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStores.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStores.fulfilled, (state, { payload }) => {
            state.stores = payload
            state.loading = false
        })
        builder.addCase(fetchStores.rejected, state => {
            state.loading = false
        })
    }
})

export const { } = storeSlice.actions;

export default storeSlice.reducer;
