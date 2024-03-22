import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './slices/authSlice';
import { dataReducers } from './slices/dataSlice';
import { popupReducers } from './slices/popupSlice';
import { OTPReducers } from './slices/OTPSlice';
import { ResetReducers } from './slices/resetPasswordSlice';
import { alertsReducers } from './slices/alertsSlice';

const store=configureStore({
    reducer:{
        auth:authReducers,
        data:dataReducers,
        popup:popupReducers,
        OTP:OTPReducers,
        Reset:ResetReducers,
        alerts:alertsReducers
    }
});

export default store;