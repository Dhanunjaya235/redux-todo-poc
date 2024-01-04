import  { FC } from 'react';
import { Todo } from "../slices/todosSlice";
import { Tr,Td ,Checkbox, Icon} from "@chakra-ui/react";
import { FiTrash2,FiEdit,FiInfo } from "react-icons/fi";
import { Button } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { openDeleteModal, openInfoModal,openEditModal } from '../slices/popupSlice';
import { selectTodo,selectMultiple } from '../slices/todosSlice';
const TodoItem:FC<Todo>=({id,task,date,status,note})=>{
    const dispatch=useDispatch();
    return(
        <>
        <Tr>
            <Td><Checkbox onChange={()=>dispatch(selectMultiple(id))} /></Td>
            <Td>{id}</Td>
            <Td>{task}</Td>
            <Td>{date}</Td>
            <Td>{note}</Td>
            <Td>{status}</Td>
            <Td><Button onClick={()=>{dispatch(openInfoModal());dispatch(selectTodo(id))}} ><Icon as={FiInfo} ></Icon></Button></Td>
            <Td><Button onClick={()=>{dispatch(openEditModal());dispatch(selectTodo(id))}}><Icon as={FiEdit} ></Icon></Button></Td>
            <Td><Button onClick={()=>{dispatch(openDeleteModal());dispatch(selectTodo(id))}}><Icon as={FiTrash2} ></Icon></Button></Td>
        </Tr>
        </>
    )
}

export default TodoItem;