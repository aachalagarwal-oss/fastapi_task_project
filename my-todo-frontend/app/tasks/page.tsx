"use client"
import Inputfields from "@/components/inputfields";
import Taskbox from "@/components/taskbox";
import { posttask } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


export default function Tasks() {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");

    const tasksMutation=useMutation({
        mutationFn:({title,desc}:{title:string,desc:string})=>{
            return posttask(title,desc)
        },
        onSuccess:(data)=>{
            alert("Task added")
            console.log(data)
            
        },
        onError:(error:any)=>{
            alert(error.message || "task adding failed")
        }

    })
    const handleClick=()=>{
        tasksMutation.mutate({title,desc})
    }
  return (
    <div className=" w-100 center flex flex-col border-4 p-4 m-auto ">
      <div className="p-2">
        <h3 className="text-3xl font-bold text-center mb-6"> Todo Manager</h3> 
      </div>
      <div>
        <Inputfields labeltext="Title" inputtext="Enter your title" value={title} onInputChange={setTitle}/>
        <Inputfields labeltext="Description" inputtext="Enter the description" value={desc} onInputChange={setDesc}/>
        <button onClick={handleClick}  className="border-3  bg-blue-600 ">+ Add Todo</button>
      </div>
     <Taskbox setTitleChanged={setTitle} setDescChanged={setDesc}/>
    </div>
  );
}
