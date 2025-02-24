import {createSlice} from "@reduxjs/toolkit";

const userDetails = createSlice({
    name:'user',
    initialState: {
        userData: null,
        tasks: []
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload.userData
        },
        setUserTasks: (state, action) => {
            state.tasks = action.payload.tasks
        }
    }
})

export const addUserData = userDetails.actions.setUserData;
export const addUserTasks = userDetails.actions.setUserTasks;


export default userDetails.reducer;