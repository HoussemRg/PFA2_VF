import {  useState } from 'react';
import { Button, Label} from 'flowbite-react';
import { useParams,useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateUser } from '../apiCalls/userApiCall';
import {useSelector} from 'react-redux'
import getImageType from '../utils/getImageType';
import Profile from '../assets/profile.png'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
function UpdateForm() {
  const user = useSelector(state=>state.auth.user);
  const { id } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues:{
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''

    }
  });
  
  
  const navigate=useNavigate()
  
  const UpUser = async(NewUser)=>{
    try{
        const response = await UpdateUser(NewUser,id);
        if (response && response.data) {
            toast.success('User Updated successfully');
            navigate('/Dashboard');
        } else {
            toast.error('Failed to update user');
        }
    } catch (error) {
        
        if (error.response && error.response.data) {
            toast.error(error.response.data); 
        } else {
            toast.error('An error occurred while updating user');
        }
    }
  }


  const onSubmit = (data) => {
        
    UpUser({newUser:data,token:user.token});
  };
  const userProfile = user || {}; 

  return (
    <div className='flex justify-center items-center mt-14'>
      <div className='w-1/4 mr-24 rounded-full'>
        <img className=' w-72 h-72 rounded-full  ' src={user && user?.profilePhoto?.data ? getImageType(user.profilePhoto.data) : Profile}  alt="" />
      </div>
      <form className="flex max-w-md flex-col gap-4 for w-2/3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fname" value="First Name" />
          </div>
          <input id="fname"{...register('firstName')} name="firstName" className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.firstName} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lname" value="Last Name" />
          </div>
          <input id="lname" name='lastName' {...register('lastName')}  className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.lastName}  />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <input id="phone" name='phoneNumber'  {...register('phoneNumber')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.phoneNumber} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <input id="email" name='email'  {...register('email')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.email} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <input id="password" name='password' {...register('password')} className='border rounded border-blue-900 w-full px-4 py-2' type='password' />
        </div>
        <Button type="submit" className='bg-yellow-600 transition hover:bg-yellow-800'>Modify Account</Button>
      </form>
    </div>
  );
}

export default UpdateForm;