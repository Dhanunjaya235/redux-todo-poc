import { Modal, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { deleteAllTodos } from '../slices/todosSlice';
import { closeDeleteAllModal } from '../slices/popupSlice';
import { successToast } from '../toasters/toast-messages';


const DeleteAllPopup=()=>{
    const {deleteAll}=useSelector((state:any)=>state.popup);
    const dispatch=useDispatch();
    return(
        <Modal show={deleteAll} style={{marginTop:"13%"}}>
            <Modal.Body>
                <h6 style={{color:"red"}}>Are You Sure To Delete All Todos ?</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>{dispatch(closeDeleteAllModal());dispatch(deleteAllTodos());successToast("Successfully Deleted")}} >Delete</Button>
                <Button variant='light' onClick={()=>{dispatch(closeDeleteAllModal())}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default DeleteAllPopup;