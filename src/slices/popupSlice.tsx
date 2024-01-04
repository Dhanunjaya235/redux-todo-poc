import {createSlice} from "@reduxjs/toolkit";


const initialState={
    deleteModal:false,
    editModal:false,
    infoModal:false,
    deleteMany:false,
    deleteAll:false,
    changePassword:false
}

const popupSlice=createSlice({
    name:'popup',
    initialState,
    reducers:{
        openDeleteModal:(state)=>{
            state.deleteModal=true
        },
        closeDeleteModal:(state)=>{
            state.deleteModal=false
        },
        openEditModal:(state)=>{
            state.editModal=true
        },
        closeEditModal:(state)=>{
            state.editModal=false
        },
        openInfoModal:(state)=>{
            state.infoModal=true
        },
        closeInfoModal:(state)=>{
            state.infoModal=false
        },
        openDeleteMultipleModal:(state)=>{
            state.deleteMany=true
        },
        closeDeleteMultipleModal:(state)=>{
            state.deleteMany=false
        },
        openDeleteAllModal:(state)=>{
            state.deleteAll=true
        },
        closeDeleteAllModal:(state)=>{
            state.deleteAll=false
        },
        changePasswordModal:(state)=>{
            state.changePassword=!state.changePassword;
        }
    }
})

export const {openDeleteModal,openEditModal,openInfoModal,closeDeleteModal,closeEditModal,
    closeInfoModal,openDeleteMultipleModal,changePasswordModal,closeDeleteMultipleModal,openDeleteAllModal,closeDeleteAllModal}=popupSlice.actions;

export default popupSlice.reducer