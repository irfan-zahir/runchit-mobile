import { createSlice } from "@reduxjs/toolkit"
import { IModelUser } from "@typings/models.d";

interface IInitialState {
    userData: IModelUser | null
    loading: boolean;
}

const initialState: IInitialState = {
    userData: null,
    loading: true
}

const usersSlice = createSlice({
    name: "currentUsers",
    initialState,
    reducers: {
        setCurrentUser: (action, { payload }: { payload: IModelUser | null }) => {
            action.loading = false
            action.userData = payload
        },
        removeCurrentUser(action, { payload }) {
            action.loading = false
            action.userData = null
        }
    },
})

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
