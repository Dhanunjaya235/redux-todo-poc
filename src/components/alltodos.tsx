import { useEffect, useState ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos,filterByDate,filterByStatus,clearFilters,sortTodosById,sortTodosByDate,setIsLoading } from "../slices/todosSlice";
import { AppDispatch } from "../store";
import { Table, Thead, Th, Tbody, Tr,Button } from "@chakra-ui/react";
import Pagination from 'react-js-pagination';
import TodoItem from "./todo";
import TodoCard from "./todo-card";
import Spinner from 'react-bootstrap/Spinner';
import DeletePopup from '../popups/delete-popup';
import EditPopup from '../popups/edit-popup';
import InfoPopup from '../popups/infoPopup';
import DeleteAllPopup from "../popups/delete-all-popup";
import DeleteMultipleModal from "../popups/delete-multiple-popup";
import { FiTrash,FiTrash2,FiGrid,FiList } from "react-icons/fi";
import { Input ,FormLabel,HStack,Box,Select,Text} from "@chakra-ui/react";
import { openDeleteMultipleModal,openDeleteAllModal } from "../slices/popupSlice";


const AllItems = () => {

    const { filteredtodos,isLoading } = useSelector((state: any) => state.todos);
    const [view,setView]=useState(false);
    const formRef=useRef<HTMLFormElement>(null)
    const itemsPerPage = 3;
    const [activePage, setActivePage] = useState(1);
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredtodos.slice(indexOfFirstItem, indexOfLastItem);
    const dispatch = useDispatch<AppDispatch>();
    const handlePageChange = (pageNumber: number) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }
    useEffect(() => {
        dispatch(setIsLoading());
        setTimeout(()=>{
            dispatch(getAllTodos())
        },1000)
    },[])
    return (
        <div>
            {isLoading ? <div style={{marginLeft:"700px",marginTop:"300px"}}>
            <Spinner animation="grow" variant="info" size="sm" /><Spinner animation="grow" variant="info" />
                </div>:
            <><div style={{ marginLeft: "40%", width: "100%", position: "fixed", marginTop: "7%" }}>
                    <form ref={formRef}>
                        <HStack>
                            <Box>
                                <FormLabel>Select Date To Filter</FormLabel>
                                <Input type="date" placeholder="Select Date To Filter" onChange={(e) => dispatch(filterByDate(e.target.value))} />
                            </Box>
                            <Box>
                                <FormLabel>
                                    Filter Todos By Status
                                </FormLabel>
                                <Select onChange={(e) => dispatch(filterByStatus(e.target.value))} placeholder='Choose Status To Filter'>
                                    <option value="Pending">Pending</option>
                                    <option value="InProgress">InProgress</option>
                                    <option value="Completed">Completed</option>
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel>   &nbsp;</FormLabel>
                                <Button onClick={() => {
                                    dispatch(clearFilters());
                                    if (formRef.current) {
                                        formRef.current.reset();
                                    }
                                } }>ClearFilters</Button>
                            </Box>
                            <Box>
                                <FormLabel>&nbsp;</FormLabel>
                                <Button onClick={() => setView(!view)}>
                                    {!view ? <FiGrid></FiGrid> : <FiList></FiList>}
                                </Button>
                            </Box>
                        </HStack>

                    </form>
                </div><div style={{ marginLeft: "40%", marginTop: "-20%", width: "100%" }}>
                        {filteredtodos.length === 0 ? <>
                            <div style={{ marginLeft: "45%", position: "fixed", marginTop: "20%" }}>
                                <h1>No Todos To Display</h1>
                            </div>
                        </> :
                            <>
                                <div style={{ position: "fixed", marginLeft: "25%", marginTop: "15%" }}>

                                    {!view ? <>
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th></Th>
                                                    <Th onClick={() => dispatch(sortTodosById())}>Id </Th>
                                                    <Th>Task</Th>
                                                    <Th onClick={() => dispatch(sortTodosByDate())}>Date</Th>
                                                    <Th>Note</Th>
                                                    <Th>Status</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {currentItems.map((todo: any) => {
                                                    return <TodoItem key={todo.id} {...todo}></TodoItem>;
                                                })}
                                            </Tbody>
                                        </Table>
                                    </> : <>
                                        {currentItems.map((todo: any) => {
                                            return <TodoCard key={todo.id} {...todo}></TodoCard>;
                                        })}
                                    </>}


                                    <div style={{ marginTop: "2%" }}>
                                        <Button leftIcon={<FiTrash />} marginRight={30} colorScheme='blue' variant='solid' onClick={() => { dispatch(openDeleteMultipleModal()); } }>Delete Selected</Button>
                                        <Button leftIcon={<FiTrash2 />} colorScheme='blue' variant='solid' onClick={() => { dispatch(openDeleteAllModal()); } }>Delete All Todos</Button>
                                    </div>
                                    <div style={{ marginLeft: "30%", position: "fixed", marginTop: "2%" }}>
                                        <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={itemsPerPage}
                                            totalItemsCount={filteredtodos.length}
                                            onChange={handlePageChange} />
                                    </div>
                                    <InfoPopup />
                                    <DeletePopup />
                                    <EditPopup />
                                    <DeleteMultipleModal />
                                    <DeleteAllPopup />
                                </div>
                            </>}
                    </div></>
}
        </div>
    )
}

export default AllItems;