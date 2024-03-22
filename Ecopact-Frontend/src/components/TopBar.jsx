import { Link } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../slices/authSlice';
import { dataActions } from '../slices/dataSlice';
import MenuListCompositionClient from './Boxes/MenuListCompositionClient';
import getImageType from '../utils/getImageType';
import Profile from '../assets/profile.png'


const TopBar = () => {
  const user = useSelector(state=>state.auth.user);
  const dispatch=useDispatch();
  const nullifyUser = ()=>{
    dispatch(dataActions.getNH4AverageRates(0))
    dispatch(dataActions.getPxOyAverageRates(0))
    dispatch(dataActions.getSAverageRates(0))
    dispatch(dataActions.getNH4PerDate(null))
    dispatch(dataActions.getPxOyPerDate(null))
    dispatch(dataActions.getSPerDate(null))
    dispatch(dataActions.getNH4PerMonth([]))
    dispatch(dataActions.getPxOyPerMonth([]))
    dispatch(dataActions.getSPerMonth([]))
    dispatch(dataActions.getNH4PerYear([]))
    dispatch(dataActions.getPxOyPerYear([]))
    dispatch(dataActions.getSPerYear([]))
    dispatch(dataActions.setRecentNH4Year(null))
    dispatch(dataActions.setRecentPxOyYear(null))
    dispatch(dataActions.setRecentSYear(null))
    dispatch(dataActions.getNH4RecentData([]))
    dispatch(dataActions.getPxOyRecentData([]))
    dispatch(dataActions.getSRecentData([]))
    dispatch(dataActions.getArrangements([]))
    dispatch(authActions.logout()); 
    localStorage.removeItem("user");
  }
  
  return (
    <div className='flex justify-end items-center pr-12 h-full text-gray-300'>
      <div className='flex justify-around items-center h-full gap-6'>
      <div
          className={`text-xl h-full flex items-center px-3 hover:bg-blue-800 transition-all } cursor-pointer `}
          onClick={nullifyUser}
        >
          <Link to="/">
            <CgLogOut />
          </Link>
        </div>
        <div className={`text-xl h-full flex items-center px-3 hover:bg-blue-800 transition-all  cursor-pointer `}>
            <MenuListCompositionClient />
        </div>
        
       
        
        <div className='flex justify-around items-center gap-3'>
            <img src={user && user?.profilePhoto?.data ? getImageType(user.profilePhoto.data) : Profile} alt="Profile Photo" className={` w-9  my-2 h-9 rounded-full`} />
            {user && user?._id  &&<Link to={`/users/details/${user?._id}`} className='font-semibold '>{user?.firstName} {user?.lastName}</Link>}
        </div>
      </div>
    </div>
  )
}

export default TopBar
