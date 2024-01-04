import { CardBody, Flex, Heading, useColorModeValue ,Card,Text} from '@chakra-ui/react';
import { Modal, Button ,} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import { closeInfoModal} from '../slices/popupSlice';
import { Container } from '@mui/material';
const InfoPopup=()=>{

    const {infoModal}=useSelector((state:any)=>state.popup);
    const dispatch=useDispatch();
    const {selectedTodo}=useSelector((state:any)=>state.todos)
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    return(
        <Flex height={300} alignItems="center" justifyContent="center">
        <Modal show={infoModal}>
        <Flex
        flexDirection="column"
        bg={formBackground}
        borderRadius={8}
        boxShadow="lg"
    >
        <Card>
                <Modal.Body>
                        <CardBody>
                            
                            <Heading>Todo Info</Heading>
                            <Text>Task : {selectedTodo.task}</Text>
                            <Text>Date :{selectedTodo.date}</Text>
                            <Text>Note : {selectedTodo.note}</Text>
                            <Text>Staus: {selectedTodo.status}</Text>
                        </CardBody>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='info' onClick={()=>dispatch(closeInfoModal())}>Close</Button>
                </Modal.Footer>
                </Card>
                </Flex>
        </Modal>

        
        </Flex>
    )
}

export default InfoPopup;