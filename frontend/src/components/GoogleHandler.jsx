import React, { useEffect } from 'react'
import {useNavigate , useLocation} from 'react-router-dom'
function GoogleHandler() {
    const navigate = useNavigate() ;
const location = useLocation() ;

useEffect(()=>{
    console.log(location.search)
const params = new URLSearchParams(location.search)
console.log(params);
const token = params.get('token') // params.get is used to find the query string from parameters
const role = params.get('role')
const name = params.get('name');
if(token && role){
  console.log("token",token,role);
    localStorage.setItem("token",token)
    localStorage.setItem('role',role)
    localStorage.setItem('name',name)

    navigate('/')
}
},[navigate ,location.search])

  return (
    <div>
     loading 
    </div>
  )
}

export default GoogleHandler;