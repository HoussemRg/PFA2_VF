import request from './request';
import { authActions } from '../slices/authSlice';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const loginUser=(user)=>{
    return async (dispatch)=>{
        try{
            const res=await request.post(`/api/auth/login`,user);
            console.log(res.data);
            dispatch(authActions.login(res.data));
            
        }catch(err){
            toast.error(err.response.data);
        }
    }
}
const registerUser=async(user)=>{
    try{
        const res = await request.post('/api/auth/register',user);
        toast.success("User registred successfully ! ");
        return true;
    }catch(err){
        
        toast.error(err.response.data);
    }

}

export {loginUser,registerUser};