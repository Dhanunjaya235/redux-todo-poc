import React from "react";
import  { FC } from 'react';
import { Todo } from "../slices/todosSlice";
import { Card, CardHeader, CardBody, CardFooter ,Text, Checkbox} from '@chakra-ui/react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "react-bootstrap";
import {useDispatch} from 'react-redux';
import { openDeleteModal, openInfoModal,openEditModal } from '../slices/popupSlice';
import { selectTodo,selectMultiple } from '../slices/todosSlice';
const TodoCard:FC<Todo>=({id,task,date,status,note})=>{
    const dispatch=useDispatch();
    return(
        <>
        <Card width={300} float='left' borderRadius={50} mr={10}>
            <CardBody>
            <Checkbox onChange={()=>dispatch(selectMultiple(id))} />
                <Text>Task : {task}</Text>
                <Text>Date :{date}</Text>
                <Text> Note : {note}</Text>
                <Text>Status : {status}</Text>
                <Button onClick={()=>{dispatch(openInfoModal());dispatch(selectTodo(id))}}><InfoIcon/></Button> &nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{dispatch(openEditModal());dispatch(selectTodo(id))}}><EditIcon/></Button> &nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{dispatch(openDeleteModal());dispatch(selectTodo(id))}}><DeleteIcon></DeleteIcon></Button>
            </CardBody>
        </Card>
        </>
    )
}

export default TodoCard;