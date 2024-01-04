import axios from 'axios';

export const postdata=async (url:string,data:any)=>{

    let responce=await axios.post(url,data);
    return responce
}

export const getDataByEmail=async (url:string,email:any)=>{
    let responce=await axios.get (`${url}/?email=${email}`)
    return responce.data[0]
}


export const updateDataByEmail=async(url:string,data:any)=>{
    let responce=await axios.put(url,data);
    return responce
}

export const deteleData=async(url:string)=>{
    let responce=await axios.delete(url);
    return responce;
}

export const updateDataById=async(url:string,data:any)=>{
    let responce=await axios.put(url,data);
    return responce
}


 