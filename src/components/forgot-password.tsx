import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
import ChangePassword from "./change-password";
import { getDataByEmail } from "../axios/apicalls";
import {useRef, useState} from 'react'
import { errorToast, successToast } from "../toasters/toast-messages";
import { setUserLoggedin } from "../slices/userSlice";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
const ForgotPassword=()=>{
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const emailref=useRef<HTMLInputElement>(null);
    const dispatch=useDispatch<AppDispatch>();
    const [verify,setVerify]=useState(false);
    const verifyEmail= async ()=>{
        if(emailref.current){
            let responce=await getDataByEmail('http://localhost:3000/registeredUsers',emailref.current.value);
            if(responce){
                console.log(responce.id)
                setVerify(true);
                successToast("Email Successfully Verified");
            }
            else{
                errorToast("User Not Registered")
            }
        }
    }
    return(
        <div>
            {
                !verify ?<Flex h="100vh" alignItems="center" justifyContent="center">
                <Flex
                    flexDirection="column"
                    bg={formBackground}
                    p={12}
                    borderRadius={8}
                >
            <Input placeholder="Enter Your Email Address" ref={emailref} /><br></br>
            <Button onClick={verifyEmail}>VerifyEmail</Button>
            </Flex>
            </Flex>:<div style={{marginTop:"10%"}}><ChangePassword/></div>
            }
        </div>
    )
}

export default ForgotPassword;