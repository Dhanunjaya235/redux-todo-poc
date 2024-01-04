
import { Modal, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todosSlice';
import { closeDeleteModal } from '../slices/popupSlice';
import { deteleData } from '../axios/apicalls';
import { successToast } from '../toasters/toast-messages';

const DeletePopup=()=>{

    const {deleteModal}=useSelector((state:any)=>state.popup);
    const {selectedTodo}=useSelector((state:any)=>state.todos);
    const dispatch=useDispatch();
    return(
        <Modal show={deleteModal} style={{marginTop:"13%"}}>
            <Modal.Body>
                <h4 style={{color:"red"}}>Are You Sure To Delete ?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>{dispatch(closeDeleteModal());dispatch(deleteTodo(selectedTodo.id));deteleData(`http://localhost:3000/todos/${selectedTodo.id}`);successToast("Deleted Successfully")}} >Delete</Button>
                <Button variant='light' onClick={()=>{dispatch(closeDeleteModal())}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePopup;