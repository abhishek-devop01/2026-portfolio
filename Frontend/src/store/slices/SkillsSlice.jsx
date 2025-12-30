import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skills: [], // usually an array, not null
    loading: true,
};

export const skillsSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {
        setSkills: (state, action) => {
            // replace all skills (for initial fetch, etc.)
            state.skills = action.payload;
        },
        addSkill: (state, action) => {
            // add new skill
            state.skills.push(action.payload);
        },
        updateSkill: (state, action) => {
            const updatedSkill = action.payload;
            const index = state.skills.findIndex(
                (s) => s._id === updatedSkill._id
            );
            if (index !== -1) {
                state.skills[index] = updatedSkill;
            }
        },
        deleteSkill: (state, action) => {
            // remove skill by id
            state.skills = state.skills.filter((s) => s._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setSkills, addSkill, updateSkill, deleteSkill, setLoading } =
    skillsSlice.actions;

export default skillsSlice.reducer;
