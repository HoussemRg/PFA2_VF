import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getAllUsers,getOneUser } from '../../apiCalls/userApiCall';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
    useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-9">
      <div className='text-blue-900 font-bold text-2xl'>Admin Dashboard</div>
      <div className="overflow-x-auto w-5/6 mx-auto border border-gray-300">
        <Table hoverable className=''>
          <Table.Head className='text-blue-900 text-center border '>
            <Table.HeadCell>#id</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              <span className="">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y border text-center">
            {users.map((user,index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index}
                </Table.Cell>
                <Table.Cell>{user.firstName+' '+user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <div className='flex justify-around '>
                    <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      <Link to={`/users/details/${user._id}`}>
                      View
                      </Link>
                    </p>
                    <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <Link to={`/users/edit/${user._id}`}>
                      Edit
                    </Link>
                    </p>
                    <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <Link to={`/users/delete/${user._id}`}>
                      Delete
                    </Link>
                    </p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default AdminDashboard;
