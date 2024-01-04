import { Flex, Heading, Input, useColorModeValue, FormControl, FormLabel, Box, Checkbox } from "@chakra-ui/react";
import { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordModal } from "../slices/popupSlice";
import { errorToast, successToast } from "../toasters/toast-messages";
import {  updateDataById } from "../axios/apicalls";
import { AppDispatch } from "../store";
const ChangePassword = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const { changePassword } = useSelector((state: any) => state.popup)
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: any) => state.user);
    const passwordToggle=()=>{
        if(formRef.current){
            if(formRef.current.password.type ===  "password" ){
                formRef.current.password.type="text";
            }
            else{
                formRef.current.password.type="password";
            }
        }
    }
    let usertoChnage = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateofbirth: user.dateofbirth,
        country: user.country,
        countrycode: user.countrycode,
        mobilenumber: user.mobilenumber,
        password: user.password,
        confirmPassword: user.confirmPassword
    }
    const formRef = useRef<HTMLFormElement>(null);
    const passwordChange = async (e: any) => {
        e.preventDefault();
        if (formRef.current) {
            if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(formRef.current.password.value)) {
                if (formRef.current.password.value === formRef.current.confirm.value) {
                    usertoChnage.password = formRef.current.password.value;
                    usertoChnage.confirmPassword = formRef.current.confirm.value;
                    console.log(usertoChnage)
                    let responce = await updateDataById(`http://localhost:3000/registeredUsers/${user.id}`, usertoChnage);
                    if (responce) {
                        successToast("Password Changed Successfully");
                        formRef.current.reset();
                        dispatch(changePasswordModal())
                    }
                    }
                else {
                    errorToast("Both Passwords Not Matching")
                }
            }
            else {
                errorToast("Password Not Matching Requirement")
            }

        }
    }

    
    return (
        <Flex alignItems="center" justifyContent="center">
                <Flex
                    flexDirection="column"
                    p={8}
                    bg={formBackground}
                    borderRadius={8}
                >
                    <Modal.Header>
                        <Heading>Change Password</Heading>
                    </Modal.Header>
                    <Modal.Body >
                        <form onSubmit={passwordChange} ref={formRef}>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="password" placeholder="Enter New Password" isRequired />
                                <Checkbox onChange={passwordToggle}>Show Password</Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel>ConfirmPassword</FormLabel>
                                <Input type="password" name="confirm" placeholder="Confirm New Password" isRequired />
                            </FormControl>
                            <Box mt={5} ml={20}>
                                <Button type="submit">Change Password</Button>&nbsp;&nbsp;
                                <Button onClick={() => dispatch(changePasswordModal())} >Cancel</Button>
                            </Box>
                        </form>
                    </Modal.Body>
                </Flex>
        </Flex>
    )
}

export default ChangePassword