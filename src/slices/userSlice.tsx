import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    gender:string,
    dateofbirth:string,
    country:string,
    countryCode:string,
    mobileNumber:string,
    password:string,
    confirmPassword:string
}
type UserState={
    user:User,
    email:string,
    loggedIn:boolean;
}

const initialState:UserState={
    user:{id:0,firstName:'',lastName:'',email:'',gender:'',dateofbirth:'',country:'',countryCode:'',
    mobileNumber:'',password:'',confirmPassword:''},
    email:'',
    loggedIn:false
}

export const setUserLoggedin=createAsyncThunk(
    'user/setUserLoggedIn',
    async(email:string,thunkApi)=>{
        try{
            const responce=await axios.get(`http://localhost:3000/registeredUsers/?email=${email}`);
            console.log(responce.data[0])
            return responce.data[0]
        }
        catch(error){
            return thunkApi.rejectWithValue("Something Went Wrong")
        }
    }
)

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
            setLogin:(state)=>{
                state.loggedIn=!state.loggedIn;
            },
            setUserData:(state,action)=>{
                state.user=action.payload;
            }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(setUserLoggedin.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.user=action.payload;
            })
    }
})
export const {setLogin,setUserData}=userSlice.actions;
export default userSlice.reducer;