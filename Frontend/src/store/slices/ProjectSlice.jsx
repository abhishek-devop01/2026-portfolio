import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [], // ✅ keep it an array instead of null (easier to map)
    loading: false, // ✅ set default to false
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        // 🔄 Replace all projects (used after fetching from backend)
        setProjects: (state, action) => {
            state.projects = action.payload;
        },

        // 🆕 Add a new project
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },

        // ✏️ Update existing project
        updateProject: (state, action) => {
            const updatedProject = action.payload;
            const index = state.projects.findIndex(
                (p) => p._id === updatedProject._id
            );
            if (index !== -1) {
                state.projects[index] = updatedProject;
            }
        },

        // ❌ Delete a project by ID
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(
                (p) => p._id !== action.payload
            );
        },

        // ⏳ Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const {
    setProjects,
    addProject,
    updateProject,
    deleteProject,
    setLoading,
} = projectsSlice.actions;

export default projectsSlice.reducer;
