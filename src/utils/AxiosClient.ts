import axios from 'axios';
import {HASURA_URL} from '../env'

// AXIOS FOR GET API
export const axiosGet =async(url:any)=>{
    try{
        const response = await axios.get(url)
        return response
    }
    catch(e){
        console.log('===AXIOS ERROR MESSAGE===\n',e)
    }
}

// AXIOS FOR POST API

export const axiosPost = async(data:any)=>{
    try{
        console.log('AXIOS data=====>',data);
        
        const response = await axios.post(HASURA_URL,data,{headers:{
            'content-type':'application/json',
            'x-hasura-admin-secret':'nb2wSEer7X61IjIZ1s4Kr429YIzrv2TVF3UPzXwslYsuNiId50q9bvj0rIvhKJhn'
          }})
        return response.data
    }
    catch(e){
        console.log('===AXIOS ERROR MESSAGE===\n',e)
    }
}