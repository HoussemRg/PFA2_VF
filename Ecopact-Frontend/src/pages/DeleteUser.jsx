import { Link, useParams } from 'react-router-dom';
import { DelUser } from '../apiCalls/userApiCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DeleteUser = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const { id } = useParams();

    const DelAction = async () => {
        try {
            const response = await DelUser(id, user);
            if (response && response.data) {
                toast.success('User deleted successfully');
                navigate('/Dashboard');
            } else {
                toast.error('Failed to delete user');
            }
        } catch (error) {

            if (error.response && error.response.data) {
                toast.error(error.response.data); 
            } else {
                toast.error('An error occurred while deleting user');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className='bo items-center justify-center flex items-center'>
                <div className="flex flex-col p-10  border  border-slate-600 gap-6 text-center">
                    <h3>Are you sure you want to delete ?</h3>
                    <div className='flex gap-3 btns'>
                        <button className="text-black  px-4 py-2 border ">
                            <Link to='/Dashboard'>
                                Cancel
                            </Link>
                        </button>
                        <button onClick={DelAction} className="text-white bg-yellow-600 px-4 py-2 border hover:text-black transition hover:bg-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;