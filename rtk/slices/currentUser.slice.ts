import { getUserAPI } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IStoreRoleModel, IUserModel } from "@typings/models.d";

interface IInitialState {
    userData: IUserModel | null
    loading: boolean;
}

const initialState: IInitialState = {
    userData: null,
    loading: true
}

export const fetchUser = createAsyncThunk("users/fetchUser", async () => await getUserAPI())

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
        },
        setCurrentRole: (action, { payload }: { payload: IStoreRoleModel }) => {
            action.userData = action.userData && { ...action.userData, currentRole: payload }
            action.loading = false

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.userData = payload.currentUser ?? null
            state.loading = false
        })
        builder.addCase(fetchUser.rejected, state => {
            state.loading = false
        })
    }
})

export const { setCurrentUser, setCurrentRole } = usersSlice.actions;

export default usersSlice.reducer;
