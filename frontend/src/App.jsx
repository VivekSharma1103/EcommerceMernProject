import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import { increment, decrement } from './redux/counterSlice';
import Homepage from './pages/Homepage.jsx';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import GoogleHandler from './components/GoogleHandler.jsx'
import Cart from './pages/Cart.jsx'
export default function App() {
  //to get the value
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.count);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/auth/google/callback' element={<GoogleHandler/>} />  
        <Route path='/cart' element={<Cart/>}></Route>
        <Route element={<PrivateRoute allowrole={["user","admin"]} />}>
            <Route path="/" element={<Homepage />} />
          </Route>


        <Route element={<PrivateRoute allowrole={["admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        
          
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

//NOTE keywords in react-redux and @reduxtoolkit
//actions => actions are the javascript object which have type and payload property

//reducers => takes the previous state and returns new state

//useDispatch
//createSlice => it generally a function which manages the reducers and actions

//store => store is like a container which have all the state we are using in our project

//initialState => initial value of the some value which is going to change

//useSelector
//provider
