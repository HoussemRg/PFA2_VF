import { toast } from 'react-toastify';
import request from './request';


const getAllUsers=async()=>{
    try{
        const res = await request.get('/api/user');
        return res;
    }catch(err){
        console.log(err);
    }
}
const getOneUser=async(id)=>{
    try{
        const res = await request.get(`/api/user/${id}`);
        return res;
    }catch(err){
        console.log(err);
    }
}
const DelUser = async (id, user) => {
    try {
        const res = await request.delete(`/api/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        return res; 
    } catch (err) {
        console.log(err);
    }
};

const UpdateUser = async (updated, id) => {
    try {
        const res = await request.put(`/api/user/${id}`, updated, {
            headers: {
                'Authorization': `Bearer ${updated.token}`
            }
        });

        return res;
    } catch (err) {
        throw err; 
    }
};

const SendEmail = async(data) => {
    try {
        const res = await request.post('/api/user/mail',data);
        return res;
    } catch (err) {
        throw err;
    }
};

const SendVerifEmail = async(data) => {
    try {
        const res = await request.post('/api/user/storeOTP',data);
        if(res){
            toast.success("Verification code sent");
        }else{
            toast.error("Error while sending code");
        }
    } catch (err) {
        throw err;
    }
};
const sendOTPCode = async(data) => {
    try {
        const res = await request.post('/api/user/matchOTP',data);
        return res;
        
    } catch (err) {
        toast.error("OTP code does not match");
        throw err;
    
    }
};
const changePassword = async(data) => {
    try {
        const res = await request.post('/api/user/changePass',data);
        return res;
        
    } catch (err) {
        toast.error("Error while changing password");
        throw err;
    
    }
};

export {getAllUsers,getOneUser,DelUser,UpdateUser,SendEmail,SendVerifEmail,sendOTPCode,changePassword};