import { fetchStoresAPI } from "@api/store.api";
import { getUserAPI } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IStoreModel } from "@typings/models.d";

interface IInitialState {
    selected: IStoreModel | null
    stores: IStoreModel[]
    loading: boolean;
}

const initialState: IInitialState = {
    stores: [],
    selected: null,
    loading: true
}

export const fetchStores = createAsyncThunk("store/fetchStores", async () => await fetchStoresAPI())

const usersSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setSelectedStore: (action, { payload }: { payload: IStoreModel | null }) => {
            action.loading = false
            action.selected = payload
        },
        setStores: (action, { payload = [] }: { payload?: IStoreModel[] }) => {
            action.loading = false
            action.stores = payload
            if (action.selected === null && payload.length > 0) action.selected = payload[0]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStores.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStores.fulfilled, (state, { payload, ...pape }) => {
            state.stores = payload.stores ?? []
            state.selected = payload.stores[0] ? payload.stores[0] : null
            state.loading = false
        })
        builder.addCase(fetchStores.rejected, state => {
            state.loading = false
        })
    }
})

export const { setSelectedStore, setStores } = usersSlice.actions;

export default usersSlice.reducer;
