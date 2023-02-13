import React from 'react';
import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ authenticated, component:Component}) => {
const PrivateRoute = ({component:Component}) => {
    const token = sessionStorage.getItem("Authorization");


    console.log(token);
    return(
        // authenticated? Component : <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
        token? Component : <Navigate to="/login"/>
    )
}

export default PrivateRoute;