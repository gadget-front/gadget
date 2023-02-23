import React from 'react';
import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ authenticated, component:Component}) => {
const PrivateRoute = ({component:Component}) => {
    const email = sessionStorage.getItem("email");


    console.log(email);
    return(
        // authenticated? Component : <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
        email? Component : <Navigate to="/startPage"/>
    )
}

export default PrivateRoute;