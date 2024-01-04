import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { errorToast } from "../toasters/toast-messages";

export interface Todo{
    id:number,
    task:string,
    date:string,
    note:string,
    status:string,
    selected:number
}

type TodosState={
    alltodos:Todo[],
    filteredtodos:Todo[],
    selectedTodo:Todo,
    sortById:boolean,
    sortByDate:boolean,
    isLoading:boolean,
    selectedIds:number[],
    viewType:string
}
const initialState:TodosState={
    alltodos:[],
    filteredtodos:[],
    selectedTodo:{id:0,task:'',note:'',date:'',status:'',selected:0},
    sortById:false,
    sortByDate:false,
    isLoading:false,
    selectedIds:[],
    viewType:"list"
}
export const getAllTodos=createAsyncThunk(
    'todos/getAllTodos',
    async(data,thunkApi)=>{
        try{
            const responce=await axios.get('http://localhost:3000/todos')
            return responce.data
        }
        catch(error){
            return thunkApi.rejectWithValue("Something Went Wrong")
        }
    }
)
const todosSlice=createSlice({
    name:"todos",
    initialState,
    reducers:{
        selectTodo:(state,action)=>{
            let item=state.filteredtodos.find(item=>item.id===action.payload)
           if(item){
            state.selectedTodo=item;
           }
        },
        deleteTodo:(state,action)=>{
            state.alltodos=state.alltodos.filter((item:any)=>item.id !==action.payload);
            state.filteredtodos=state.alltodos;
        },
        editTodo:(state,action)=>{
            console.log(action.payload);
            state.alltodos=state.alltodos.map((item:any)=>{
                if(item.id===action.payload.id){
                    item.task=action.payload.task;
                    item.note=action.payload.note;
                    item.date=action.payload.date;
                    item.status=action.payload.status;
                    return item
                }
                else{
                    return item
                }
            })
            state.filteredtodos=state.alltodos
        },
        selectMultiple:(state,action)=>{
            const todo=state.alltodos.find((item:any)=>item.id===action.payload);
            if(todo?.selected===0){
                todo.selected=1;
                console.log(todo.selected);
                return;
            }
            if(todo?.selected===1){
                todo.selected=0;
                console.log(todo.selected);
                return;
            }
        },
        deleteMultiple:(state)=>{
                state.alltodos=state.alltodos.filter((todo:any)=>todo.selected===0);
                state.filteredtodos=state.alltodos;
        },
        filterByDate:(state,action)=>{
            console.log(action.payload);
            state.filteredtodos=state.alltodos.filter((item:any)=>item.date===action.payload);
        },
        filterByStatus:(state,action)=>{
            console.log(action.payload);
            state.filteredtodos=state.alltodos.filter((item:any)=>item.status===action.payload);
        },
        clearFilters:(state)=>{
            state.filteredtodos=state.alltodos;
        },
        deleteAllTodos:(state)=>{
            state.alltodos=[];
            state.filteredtodos=[];
        },
        sortTodosById:(state)=>{
            if(!state.sortById){
                state.filteredtodos=state.filteredtodos.sort((todo1,todo2)=>(todo1.id<todo2.id)?1:(todo1.id>todo2.id)?-1:0);
                state.sortById=true;
            }
            else{
                state.filteredtodos=state.alltodos;
                state.sortById=false;
            }
            state.sortByDate=false;
        },
        sortTodosByDate:(state)=>{
            if(!state.sortByDate){
                state.filteredtodos=state.filteredtodos.sort((todo1,todo2)=>(todo1.date<todo2.date)?1:(todo1.date>todo2.date)?-1:0);
                state.sortByDate=true;
                
            }
            else{
                state.filteredtodos=state.filteredtodos.sort((todo1,todo2)=>(todo1.date>todo2.date)?1:(todo1.date<todo2.date)?-1:0);
                state.sortByDate=false
            }
            state.sortById=false
        },
        setIsLoading:(state)=>{
            state.isLoading=true;
        },
        setSelectedIds:(state,action)=>{
            console.log(action.payload);
            state.selectedIds=action.payload
        },
        deleteTodosByIds:(state)=>{
            state.alltodos=state.alltodos.filter((todo)=>!state.selectedIds.includes(todo.id));
            state.filteredtodos=state.alltodos;
        },
        setViewType:(state)=>{
            state.viewType=state.viewType=='list'?'grid':'list'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllTodos.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getAllTodos.fulfilled,(state,action)=>{
                state.isLoading=false;  
                state.alltodos=action.payload;
                state.filteredtodos=state.alltodos;  
            })
            .addCase(getAllTodos.rejected,(state)=>{
                state.isLoading=false;
                errorToast("Something Went Wrong");
            })
    }
})


export const {selectTodo,deleteTodo,editTodo,selectMultiple,deleteMultiple,filterByDate,
    filterByStatus,clearFilters,deleteAllTodos,sortTodosById,sortTodosByDate,setIsLoading,
       deleteTodosByIds,setSelectedIds,setViewType }=todosSlice.actions

export default todosSlice.reducer