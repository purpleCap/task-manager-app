import {createSlice} from "@reduxjs/toolkit";

const userDetails = createSlice({
    name:'user',
    initialState: {
        userData: null,
        tasks: [],
        isLoading: false,
        is403: false
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
        setIs403: (state, action) => {
            state.is403 = action.payload.is403
        },
    }
})

export const addUserData = userDetails.actions.setUserData;
export const addUserTasks = userDetails.actions.setUserTasks;
export const addLoading = userDetails.actions.setLoading;
export const addIs403 = userDetails.actions.setIs403;


export default userDetails.reducer;