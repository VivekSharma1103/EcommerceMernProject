import React from 'react';
import logo from '../../assets/logo_big.png';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { GoHeart } from 'react-icons/go';
import { Link, useNavigate} from 'react-router-dom';
import Navitems from './Navitems';
import { NavData } from './data';
import { GoSignOut } from "react-icons/go";
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../../redux/userSlice'
import { MdOutlineDashboardCustomize } from "react-icons/md";
function Navbar() {
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // for redirecting after logout
  const Navigate = useNavigate();
  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the state and localStorage
     // Redirect to login page (or any other page)
     Navigate('/login');
  };  return (
    <header className="sticky top-0 z-50  bg-white border border-gray-200 ">
      <div>
        {/* //firstrow */}
        <div className="flex justify-between items-center p-2 mb-3">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-10" />
            <p className="text-xl tracking-wide font-semibold">ShopS</p>
          </div>

          <div className="w-96">
            <input
              className="w-full p-2 font-normal bg-white border border-gray-500 rounded-none"
              type="text"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center space-x-10 mt-4">

              <Link to="/profile">
              <AiOutlineUser />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
               {name ? name : 'User'}
              </span>
            </Link>
            { role=="admin" &&
            <Link to='/dashboard' className='relative'>
            <MdOutlineDashboardCustomize/>
            <span className="text-xs font-medium hover:underline transition-all duration-200">
                DashBoard
              </span>
            </Link>
}
            <Link to="/cart" className='relative'>
              <HiOutlineShoppingBag />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
                Cart 
              </span>
{totalQuantity > 0 ? <span className='h-4 w-4 flex top-[-11px] right-[2px] items-center text-[9px] p-1 rounded-full justify-center bg-lime-500 absolute'>{totalQuantity}</span> : null }
 
             </Link>
            
           
             <button onClick={handleLogout} className="flex items-center space-x-1">
              <GoSignOut />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
                Log-Out
              </span>
            </button>
          </div>
        </div>

        {/* second */}
        <hr />
        <div>
          <div className="flex justify-center items-center mt-2 mb-3">
            <ul className="flex space-x-10">
              {NavData.map((items,index) => (
                <Navitems to={items.url} text={items.text} key={index}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;