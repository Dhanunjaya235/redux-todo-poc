import { ChangeEvent, useEffect, useState } from "react";
import { GridRowsProp, GridToolbar, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getAllTodos } from "../slices/todosSlice";
import ReorderIcon from '@mui/icons-material/Reorder';
import { FiTrash2, FiEdit, FiInfo, FiGrid, FiList } from "react-icons/fi";
import { Button, Link, TextField } from "@mui/material";
import { openDeleteModal, openInfoModal, openEditModal, openDeleteMultipleModal } from '../slices/popupSlice';
import { selectTodo } from '../slices/todosSlice';
import Tooltip from '@mui/material/Tooltip';
import { setSelectedIds, setViewType } from "../slices/todosSlice";
import TodoGrid from "./grid-todo";
import { DataGridPro } from '@mui/x-data-grid-pro';

const DataGridTodoList = () => {
    console.log("sdfsfsfdf");
    const { filteredtodos } = useSelector((state: any) => state.todos);
    const dispatch = useDispatch<AppDispatch>();
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [rows, setRows] = useState<GridRowsProp>([]);
    useEffect(() => {
        dispatch(getAllTodos());
    }, []  )
    useEffect(() => {
        let newRows = filteredtodos.slice(paginationModel.page * 5, (paginationModel.page + 1) * 5);
        console.log(newRows);
        setRows(newRows);

    }, [paginationModel.page, filteredtodos]);
    const handleCellClick = (params: any) => {
        console.log(params)
        if (params.field === '__check__' || params.field === 'actions' || params.field==='__reorder__') {
            return;
        }
        dispatch(selectTodo(params.id));
        dispatch(openInfoModal());
    }
    const handleColumnOrderChange = (params: any) => {
        console.log(params)
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            editable: false,
            type: 'number',
            flex: 1,
            filterable:false
        },
        {
            field: 'task',
            headerName: 'Task',
            editable: false,
            flex: 1,
            type:'string',
            filterable:false
        },
        {
            field: 'date',
            headerName: 'Date',
            editable: false,
            flex: 1,
            type: 'date',
            valueFormatter: (params: GridValueFormatterParams) => {
                //return format(new Date(params.value),'m/dd/yyyy');
                //return new Intl.DateTimeFormat('en-UK', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(params.value));
                return new Intl.DateTimeFormat('fr', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(params.value));
            },
            valueGetter: (params: GridValueGetterParams) => {
                return new Date(params.value).toISOString().slice(0, 10);
            }
        },
        {
            field: 'note',
            headerName: 'Note',
            editable: false,
            flex: 1,
            visibleFlag:true,
            valueFormatter: undefined,
            valueOptions:undefined,
            type:'string'
        },
        {
            field: 'status',
            headerName: 'Status',
            editable: false,
            flex: 1,
            type: "singleSelect",
            valueOptions: ["Pending", "InProgress", "Completed"]
        },
        {
            field: 'actions',
            headerName: '',
            editable: false,
            renderCell: (cellValues: any) => {
                return (
                    <><Tooltip title="Info">
                        <Link style={{ cursor: "pointer" }} onClick={() => {
                            dispatch(selectTodo(cellValues.id));
                            dispatch(openInfoModal());
                        }}>
                            <FiInfo size={30} />
                        </Link>
                    </Tooltip>&nbsp;&nbsp;&nbsp;
                        <Tooltip title="Edit">
                            <Link style={{ cursor: "pointer" }} onClick={() => {
                                dispatch(selectTodo(cellValues.id));
                                dispatch(openEditModal());
                            }}>
                                <FiEdit size={30} />
                            </Link>
                        </Tooltip>&nbsp;&nbsp;&nbsp;
                        <Tooltip title="Delete">
                            <Link style={{ cursor: "pointer" }} onClick={() => {
                                dispatch(openDeleteModal())
                                dispatch(selectTodo(cellValues.id))
                            }}>
                                <FiTrash2 size={30} />
                            </Link>
                        </Tooltip>
                    </>
                )
            },
            flex: 1
        },

    ];
    const onchnage=(e:ChangeEvent)=>{
            console.log((e.target as HTMLInputElement).value)
    }
    return (
        <>
            <div style={{ marginLeft: "50%", marginTop: "3%" }}>
                <TextField onChange={onchnage} ></TextField>
                <Tooltip title="List/Grid View" >
                    <Button onClick={() => { setView(!view); dispatch(setViewType()) }} >
                        {!view ? <FiGrid size={30} /> : <FiList size={30} />}
                    </Button>
                </Tooltip>
            </div>
            {
                !view ? <><div style={{ width: "100%" }}>
                    <DataGridPro
                        rows={rows}
                        rowCount={50}
                        paginationMode="server"
                        columns={columns}
                        keepNonExistentRowsSelected
                        checkboxSelection
                        onColumnOrderChange={handleColumnOrderChange}
                        paginationModel={paginationModel}
                        onCellClick={handleCellClick}
                        onRowSelectionModelChange={(ids) => {
                            let selected: number[] = [];
                            for (let id in ids) {
                                let i: number = ids[id] as number;
                                selected.push(i);
                            }
                            selected.length > 0 ? setShow(true) : setShow(false);
                            console.log(selected)
                            dispatch(setSelectedIds(selected));
                        }}
                        rowReordering
                        disableRowSelectionOnClick
                        pagination
                        onPaginationModelChange={setPaginationModel}
                        autoHeight
                        sx={{
                            marginTop: "5%", width: "100%",textAlign:"center"
                        }}
                        slots={{
                            rowReorderIcon: ReorderIcon,
                            toolbar: GridToolbar
                        }}
                        disableColumnSelector
                        disableDensitySelector
                        slotProps={{
                            toolbar: {
                                printOptions: { disableToolbarButton: true },
                                csvOptions: { disableToolbarButton: true },
                        }
                        }}
                    />
                </div><div>
                        {show ? <Button style={{ marginLeft: "40%" }} variant="contained" onClick={() => { setShow(false); dispatch(openDeleteMultipleModal()); }}>Delete Seleted</Button> : null}
                    </div></> : <TodoGrid />
            }
        </>
    )
}

export default DataGridTodoList;