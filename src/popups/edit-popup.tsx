import {  useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { editTodo} from '../slices/todosSlice';
import {  closeEditModal } from '../slices/popupSlice';
import { Box, Flex, Heading, Input, Select, Textarea, useColorModeValue } from '@chakra-ui/react';
import { updateDataById } from '../axios/apicalls';
import { successToast,errorToast } from '../toasters/toast-messages';
const EditPopup=()=>{
    const {editModal}=useSelector((state:any)=>state.popup);
    const dispatch=useDispatch();
    const {selectedTodo}=useSelector((state:any)=>state.todos);
    const [formData,setFormData]=useState(selectedTodo);
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    useEffect(()=>{
        setFormData(selectedTodo)
    },[editModal])
    
    const handleInputChange = (e:any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const onSubmit=async (e:any)=>{
        e.preventDefault();
        console.log(formData);
        dispatch(editTodo(formData));
        dispatch(closeEditModal());
        let responce=await updateDataById(`http://localhost:3000/todos/${formData.id}`,formData);
        if(responce.data){
            successToast("Todo Edited Successfully")
        }
        else{
            errorToast("Something Went Wrong");
        }
    }
    return(
        
            <Flex alignItems="center" justifyContent="center">
                
                    <Modal show={editModal}>
                    <Flex
                    flexDirection="column"
                    p={8}
                    bg={formBackground}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Modal.Header>
                <Heading>Edit Todo</Heading>
            </Modal.Header>
            <Modal.Body >
                <form onSubmit={onSubmit}>
                    <Input type="text" name='task' onChange={handleInputChange}  value={formData.task} placeholder='Enter Task' /><br></br>
                    <Input type="date"  onChange={handleInputChange} min={new Date().toISOString().slice(0, 10)} name='date' value={formData.date}  placeholder='Enter Date' /><br></br>
                    <Textarea value={formData.note} name='note' onChange={handleInputChange} placeholder='Enter Note'>
                    </Textarea><br></br>
                    <Select value={formData.status} name='status' onChange={handleInputChange}>
                        <option value="Pending">Pending</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Completed">Completed</option>
                    </Select><br></br>
                    <Box marginLeft={130}>
                    <Button type='submit' variant='success'>Edit</Button> &nbsp;&nbsp;
                    <Button variant='light' onClick={()=>dispatch(closeEditModal())}>Cancel</Button>
                    </Box>
                </form>
                </Modal.Body>
                </Flex>
                </Modal>
                </Flex>
            
        
    )
}


export default EditPopup;