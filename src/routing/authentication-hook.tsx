import { useEffect, useState } from "react";

function useAuthenticationHook(){
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    useEffect(()=>{
        const token=localStorage.getItem('userid');
        if(token){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        }
    })
    return [isAuthenticated,setIsAuthenticated]
}

export default useAuthenticationHook;