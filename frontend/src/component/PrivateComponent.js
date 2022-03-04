import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
    //if authorization available then it redirect to components , otherwise stock in signup page
    return  auth ? <Outlet/> : <Navigate to={"/signup"}/>
}

export default PrivateComponent