import  React from  "react";
import {  Navigate } from  "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
interface PrivateRouteProps{
        component: ReactNode,
}
const  PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
        const {loggedIn}=useSelector((state:any)=>state.user)
    return  loggedIn  ? (<>{props.component}</>) : 
        (<Navigate  to="/"  />);
};
export  default  PrivateRoute;