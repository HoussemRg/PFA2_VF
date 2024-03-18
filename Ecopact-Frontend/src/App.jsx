import 'normalize.css';
import {Routes,Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboards/Dashboard';
import './index.css'
import { ToastContainer } from "react-toastify";
import {useSelector} from 'react-redux'
import ShowUser from './pages/ShowUser';
import DeleteUser from './pages/DeleteUser';
import UpdateUser from './pages/UpdateUser';

//<Route path='*' element={<NotFound />} />
function App() {
  const user=useSelector(state => state.auth.user)
  
  return (
      
      <>
        <ToastContainer theme="colored" position="top-center" />
        <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={ <Register/>} />
        <Route path='/Login' element={!user ? <Login/> : <Navigate to="/" /> }/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Dashboard' element={user ? <Dashboard/> : <Home/>} ></Route>
        <Route path={`/users/details/:id`} element={user ? <ShowUser/> : <Home/> } ></Route>
        <Route path={`/users/delete/:id`} element={user ? <DeleteUser/> : <Home/> } ></Route>
        <Route path={`/users/edit/:id`} element={user ? <UpdateUser/> : <Home/> } ></Route>
        

        
      </Routes>
      </>
      
    
  )
}

export default App
