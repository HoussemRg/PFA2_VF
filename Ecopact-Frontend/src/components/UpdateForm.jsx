import {  useState } from 'react';
import { Button, Label} from 'flowbite-react';
import { useParams,useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateUser } from '../apiCalls/userApiCall';
import {useSelector} from 'react-redux'


function UpdateForm() {
  const user = useSelector(state=>state.auth.user);
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const navigate=useNavigate()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
      });
  };
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


  const onSubmit = (event) => {
    let UpdatedUser = {};
    for (const key in formData) {
        if (formData[key] === '') {
            UpdatedUser[key] = user[key];
        } else {
            UpdatedUser[key] = formData[key];
        }
        UpdatedUser.token = user.token;
        
        
    }
    
    UpUser(UpdatedUser);
  };
  const userProfile = user || {}; 
  const imageSrc = userProfile.profilePhoto ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(userProfile.profilePhoto.data)))}` : ''; 

  return (
    <div className='flex justify-center items-center'>
      <div className='w-1/4 ml-32'>
        <img className='w-full' src={imageSrc} alt="" />
      </div>
      <form className="flex max-w-md flex-col gap-4 for w-2/3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fname" value="First Name" />
          </div>
          <input id="fname"{...register('firstName')} name="firstName" className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.firstName} onChange={handleInputChange}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lname" value="Last Name" />
          </div>
          <input id="lname" name='lastName' {...register('lastName')}  className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.lastName} onChange={handleInputChange} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <input id="phone"  {...register('phoneNumber')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.phoneNumber} onChange={handleInputChange}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <input id="email"  {...register('email')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.email} onChange={handleInputChange}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <input id="password" {...register('password')} className='border rounded border-blue-900 w-full px-4 py-2' type='password' onChange={handleInputChange}/>
        </div>
        <Button type="submit" className='bg-yellow-600 transition hover:bg-yellow-800'>Modify Account</Button>
      </form>
    </div>
  );
}

export default UpdateForm;