import { getUserAPI } from "@api/users.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    expanded: boolean;
    activeModal: "stores" | "roles" | null
}

const initialState: IInitialState = {
    expanded: false,
    activeModal: null
}

const sidebarSlice = createSlice({
    name: "sidebarState",
    initialState,
    reducers: {
        setSidebarExpand(action, { payload }: { payload: boolean }) {
            action.expanded = payload
        },
        setVisibleModal(action, { payload }: { payload: "stores" | "roles" | null }) {
            action.activeModal = payload
        }
    }
})

export const { setSidebarExpand, setVisibleModal } = sidebarSlice.actions;

export default sidebarSlice.reducer;
