import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
};

export const userSlice = createSlice({
    initialState,
    name: "currentuser",
    reducers: {
        currentuser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { currentuser, setLoading } = userSlice.actions;
export default userSlice.reducer;
