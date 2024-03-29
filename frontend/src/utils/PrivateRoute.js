import { Navigate, Outlet } from "react-router-dom";
import React,{useContext} from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ()=>{
    let {user}  = useContext(AuthContext)
    console.log(user)
    return user? <Outlet/>: <Navigate to='/main'/>
}

export default PrivateRoute;