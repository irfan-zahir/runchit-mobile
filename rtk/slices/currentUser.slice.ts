import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserData } from "@typings/providers";

interface IInitialState {
    userData: IUserData | null
    loading: boolean;
}

const initialState: IInitialState = {
    userData: null,
    loading: true
}

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     // const response = await fetch('https://reqres.in/api/users?delay=1');
//     // return (await response.json()).data as UserData[];
//     return { hello: "world" }
// });

const usersSlice = createSlice({
    name: "currentUsers",
    initialState,
    reducers: {
        // ping(action, { payload }) {
        //     action.test = payload
        // },
        setCurrentUser: (action, { payload }: { payload: IUserData | null }) => {
            action.loading = false
            action.userData = payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchUsers.pending, state => {
    //         state.loading = true
    //     })
    //     builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //         state.test = action.payload
    //         state.loading = false
    //     })
    //     builder.addCase(fetchUsers.rejected, state => {
    //         state.loading = false
    //     })
    // }
})

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
