import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Modal } from "react-bootstrap";
import {  useSelector } from "react-redux";
import ChangePassword from "../components/change-password";
const ChangePasswordPopup = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const { changePassword } = useSelector((state: any) => state.popup)
    return (
        <Flex alignItems="center" justifyContent="center">

            <Modal show={changePassword}>
            <Flex
                    flexDirection="column"
                    bg={formBackground}
                    borderRadius={8}
                    boxShadow="lg"
                >
                <ChangePassword/>
                </Flex>
            </Modal>
        </Flex>
    )
}

export default ChangePasswordPopup