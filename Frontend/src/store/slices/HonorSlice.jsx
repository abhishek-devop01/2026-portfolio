import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    honors: null,
    loading: true,
};

export const honorSlice = createSlice({
    initialState,
    name: "honors",
    reducers: {
        addhonor: (state, action) => {
            state.honors = action.payload;
        },
        updateHonor: (state, action) => {
            const updatedHonor = action.payload;
            const index = state.honors.findIndex(
                (h) => h._id === updatedHonor._id
            );
            if (index !== -1) {
                state.honors[index] = updatedHonor;
            }
        },
        deleteHonor: (state, action) => {
            state.honors = state.honors.filter((h) => h._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { addhonor, updateHonor, deleteHonor, setLoading } =
    honorSlice.actions;
export default honorSlice.reducer;
