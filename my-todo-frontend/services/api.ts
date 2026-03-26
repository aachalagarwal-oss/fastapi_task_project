const BASE_URL="http://localhost:8000";


export const loginUser=async (email:string,password:string)=>{
    try{
        const response=await fetch(`${BASE_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password
            })
        })

        const data=await response.json();
        if(!response.ok){
            throw new Error(data.detail || "login failed")
        }
        return data;
    }
    catch(error){
       throw error;
    }
}


export const posttask=async(title:string,desc:string)=>{
    const token=localStorage.getItem("token");
    try{
        const response=await fetch(`${BASE_URL}/tasks`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                title,
                description:desc
            })
        })

        const data=await response.json();
        if(!response.ok){
            throw new Error(data.detail || "Can't add your task")
        }
        return data
    }
    catch(error){
        throw error;
    }
}

export const gettask=async()=>{
    const token=localStorage.getItem("token");
    try{
        const res=await fetch(`${BASE_URL}/tasks`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            
        })
        const datafind=await res.json();
        if(!res.ok){
            throw new Error(datafind.detail || "Can't get your task")
        }
        return datafind
    }
    catch(error){
        throw error;
    }
}