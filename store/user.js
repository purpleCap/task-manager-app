import {createSlice} from "@reduxjs/toolkit";

const userDetails = createSlice({
    name:'user',
    initialState: {
        userData: null,
        tasks: [],
        isLoading: false
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData
        },
        setUserTasks: (state, action) => {
            state.tasks = action.payload.tasks
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
    }
})

export const addUserData = userDetails.actions.setUserData;
export const addUserTasks = userDetails.actions.setUserTasks;
export const addLoading = userDetails.actions.setLoading;


export default userDetails.reducer;