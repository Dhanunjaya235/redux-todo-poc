import Grid from '@mui/material/Grid';
import {useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { AppDispatch } from "../store";
import { FiTrash2,FiEdit,FiInfo } from "react-icons/fi";
import Pagination from 'react-js-pagination';
import Tooltip from '@mui/material/Tooltip';
import {  Button, Checkbox, Link } from "@mui/material";
import { openDeleteModal, openInfoModal,openEditModal,openDeleteMultipleModal } from '../slices/popupSlice';
import { selectTodo,selectMultiple } from '../slices/todosSlice';
import Paper from '@mui/material/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop:"5%"
    },
    paper: {
      padding: 10,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius:0
    },
    actions:{
        marginLeft:"13%",
        cursor:"pointer",
    },
    layout:{
        borderRadius:70
    }
  }),
);
const TodoGrid=()=>{
    const {filteredtodos}=useSelector((state:any)=>state.todos);
    const dispatch = useDispatch<AppDispatch>();
    const itemsPerPage = 3;
    const [show,setShow]=useState(false);
    const [activePage, setActivePage] = useState(1);
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredtodos.slice(indexOfFirstItem, indexOfLastItem);
    let checkboxes:HTMLInputElement[]=document.getElementsByName("cardCheckbox") as unknown as HTMLInputElement[]
    const handlePageChange = (pageNumber: number) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }
    const handleCheckBoxes=()=>{
        for(let index=0;index<checkboxes.length;index++){
            if(checkboxes[index].checked===true){
                setShow(true);
                return;
            }
        }
        setShow(false)
    }
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <Grid container spacing={3} >
                {
                    currentItems.map((todo:any,index:any)=>{
                       return (<Grid item xs={4} key={index}>
                                <Paper elevation={5}  >
                                <Paper className={classes.paper}>{todo.task}</Paper>
                                <Paper className={classes.paper}>{todo.date}</Paper>
                                <Paper className={classes.paper}>{todo.note}</Paper>
                            <Paper className={classes.paper}>{todo.status}</Paper>
                            <Paper>
                                <Tooltip title="Select"><Checkbox name='cardCheckbox' style={{marginLeft:"13%",cursor:"pointer"}} onChange={()=>{dispatch(selectMultiple(todo.id));handleCheckBoxes()}} /></Tooltip>
                                <Tooltip title="Info" ><Link style={{marginLeft:"13%",cursor:"pointer"}}  onClick={()=>{dispatch(selectTodo(todo.id));dispatch(openInfoModal())}} ><FiInfo size={30}/></Link></Tooltip>
                                <Tooltip title="Edit"><Link style={{marginLeft:"13%",cursor:"pointer"}}  onClick={()=>{dispatch(selectTodo(todo.id));dispatch(openEditModal())}} ><FiEdit size={30}/></Link></Tooltip>
                                <Tooltip title="Delete"><Link style={{marginLeft:"13%",cursor:"pointer"}} onClick={()=>{dispatch(selectTodo(todo.id));dispatch(openDeleteModal())}} ><FiTrash2 size={30}/></Link></Tooltip>
                                </Paper>
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>
                {show && <Button variant='contained' sx={{marginLeft:"44%",marginTop:"3%"}} onClick={()=>dispatch(openDeleteMultipleModal())}>Delete Selected</Button>}
            <div style={{float:"right",marginTop:"10%"}}>
            <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={itemsPerPage}
                                            totalItemsCount={filteredtodos.length}
                                            onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default TodoGrid;