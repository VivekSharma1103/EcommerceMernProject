import React from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { logout } from '../../redux/userSlice';
function TopNav() {


  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
 
  const handleLogOut = async() => {
  await dispatch(logout())
  navigate('/login')
}
  return (
    <div className='flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200'>
    <Link to="/profile"> <h1 className='text-xl font-semibold underline'>Welcome {localStorage.getItem('name')}</h1></Link>
      <div>
      <button onClick={handleLogOut} className='text-3xl'><MdLogout className='hover:text-red-900'/></button>
      </div>
    </div>
  )
}

export default TopNav