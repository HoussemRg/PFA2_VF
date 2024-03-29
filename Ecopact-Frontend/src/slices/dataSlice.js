import {createSlice} from "@reduxjs/toolkit"

const dataSlice=createSlice({
    name:'data',
    initialState:{
        NH4AverageRates:0,
        PxOyAverageRates:0,
        SAverageRates:0,
        NH4DataPerDate:null,
        PxOyDataPerDate:null,
        SDataPerDate:null,
        NH4DataPerMonth:[],
        PxOyDataPerMonth:[],
        SDataPerMonth:[],
        NH4DataPerYear:[],
        PxOyDataPerYear:[],
        SDataPerYear:[],
        recentNH4Year:null,
        recentPxOyYear:null,
        recentSYear:null,
        NH4RecentData:[],
        PxOyRecentData:[],
        SRecentData:[],
        Arrangements:[]
    },
    reducers:{
        getNH4AverageRates:(state,action)=>{
            state.NH4AverageRates=action.payload;
        },
        getPxOyAverageRates:(state,action)=>{
            state.PxOyAverageRates=action.payload;
        },
        getSAverageRates:(state,action)=>{
            state.SAverageRates=action.payload;
        },
        getNH4PerDate:(state,action)=>{
            state.NH4DataPerDate=action.payload?.data?.dataRate;
        },
        getPxOyPerDate:(state,action)=>{
            state.PxOyDataPerDate=action.payload?.data?.dataRate;
        },
        getSPerDate:(state,action)=>{
            state.SDataPerDate=action.payload?.data?.dataRate;
        },
        getNH4PerMonth:(state,action)=>{
            state.NH4DataPerMonth=action.payload;
        },
        getPxOyPerMonth:(state,action)=>{
            state.PxOyDataPerMonth=action.payload;
        },
        getSPerMonth:(state,action)=>{
            state.SDataPerMonth=action.payload;
        },
        getNH4PerYear:(state,action)=>{
            state.NH4DataPerYear=action.payload;
        },
        getPxOyPerYear:(state,action)=>{
            state.PxOyDataPerYear=action.payload;
        },
        getSPerYear:(state,action)=>{
            state.SDataPerYear=action.payload;
        },
        setRecentNH4Year:(state,action)=>{
            state.recentNH4Year=action.payload;
        },
        setRecentPxOyYear:(state,action)=>{
            state.recentPxOyYear=action.payload;
        },
        setRecentSYear:(state,action)=>{
            state.recentSYear=action.payload;
        },
        getNH4RecentData:(state,action)=>{
            state.NH4RecentData=action.payload;
        },
        getPxOyRecentData:(state,action)=>{
            state.PxOyRecentData=action.payload;
        },
        getSRecentData:(state,action)=>{
            state.SRecentData=action.payload;
        },
        getArrangements:(state,action)=>{
            state.Arrangements=action.payload;
        },
        
    }
})

const dataActions=dataSlice.actions;

const dataReducers=dataSlice.reducer;
export {dataActions,dataReducers}