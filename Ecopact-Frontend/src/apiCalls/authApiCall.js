import request from './request';
import { authActions } from '../slices/authSlice';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const loginUser=(user)=>{
    return async (dispatch)=>{
        try{
            const res=await request.post(`/api/auth/login`,user);
            dispatch(authActions.login(res.data));
            
            localStorage.setItem("user",JSON.stringify(res.data))
        }catch(err){
            toast.error(err.response.data,{autoClose:1200});
        }
    }
}
const registerUser=async(user)=>{
    try{
        const res = await request.post('/api/auth/register',user);
        toast.success(res.data,{autoClose:1200});
        return true;
    }catch(err){
        toast.error(err.response.data,{autoClose:1200});
    }

}

const verifyAccount=(userId,token)=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.verifyEmail());
            toast.success(res.data,{autoClose:1200})
        }catch(err){
            
            console.log(err.response.data);
        }
    }
    

}

export {loginUser,registerUser,verifyAccount};