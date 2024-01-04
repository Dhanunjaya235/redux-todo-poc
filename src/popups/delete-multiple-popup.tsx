import { Modal, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { deleteMultiple,deleteTodosByIds } from '../slices/todosSlice';
import { closeDeleteMultipleModal } from '../slices/popupSlice';
import { successToast } from '../toasters/toast-messages';

const DeleteMultipleModal=()=>{


    const {deleteMany}=useSelector((state:any)=>state.popup);
    const {viewType}=useSelector((state:any)=>state.todos);
    const dispatch=useDispatch();
    return(
        <Modal show={deleteMany} style={{marginTop:"13%"}}>
            <Modal.Body>
                <h6 style={{color:"red"}}>Are You Sure To Delete Selected ?</h6>
            </Modal.Body>
            <Modal.Footer>
                {
                    viewType=='list' ?                 <Button variant='danger' onClick={()=>{dispatch(closeDeleteMultipleModal());dispatch(deleteTodosByIds());successToast("SuccessFully Deleted Selected Todos")}} >Delete</Button>
                    :                <Button variant='danger' onClick={()=>{dispatch(closeDeleteMultipleModal());dispatch(deleteMultiple());successToast("SuccessFully Deleted Selected Todos")}} >Delete</Button>

                }
                <Button variant='light' onClick={()=>{dispatch(closeDeleteMultipleModal())}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteMultipleModal;