import { getUserAPI } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserModel } from "@typings/models.d";

interface IInitialState {
    userData: IUserModel | null
    loading: boolean;
}

const initialState: IInitialState = {
    userData: null,
    loading: true
}

export const fetchProducts = createAsyncThunk("users/fetchUser", async () => await getUserAPI())

const usersSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (action, { payload }: { payload: IUserModel | null }) => {
            action.loading = false
            action.userData = payload
        },
        removeCurrentUser(action, { payload }) {
            action.loading = false
            action.userData = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.userData = payload.currentUser ?? null
            state.loading = false
        })
        builder.addCase(fetchProducts.rejected, state => {
            state.loading = false
        })
    }
})

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
