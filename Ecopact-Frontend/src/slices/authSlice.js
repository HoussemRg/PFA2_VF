import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        logout:(state)=>{
            state.user=null;
        }
    }
})

const authActions=authSlice.actions;

const authReducers=authSlice.reducer;
export {authActions,authReducers}

