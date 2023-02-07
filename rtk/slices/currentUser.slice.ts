import { getCurrentUserData } from "@api/user.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IDatabaseUser } from "@typings/api.d"

interface IInitialState {
    userData: IDatabaseUser | null
    loading: boolean;
}

const initialState: IInitialState = {
    userData: null,
    loading: true
}

// export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
//     // const response = await fetch('https://reqres.in/api/users?delay=1');
//     // return (await response.json()).data as UserData[];
//     const res = await getCurrentUserData()
//     if(res.message === "new-user")
//     return { hello: "world" }
// });

const usersSlice = createSlice({
    name: "currentUsers",
    initialState,
    reducers: {
        // ping(action, { payload }) {
        //     action.test = payload
        // },
        setCurrentUser: (action, { payload }: { payload: IDatabaseUser | null }) => {
            action.loading = false
            action.userData = payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchUser.pending, state => {
    //         state.loading = true
    //     })
    //     builder.addCase(fetchUser.fulfilled, (state, action) => {
    //         state.test = action.payload
    //         state.loading = false
    //     })
    //     builder.addCase(fetchUser.rejected, state => {
    //         state.loading = false
    //     })
    // }
})

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
