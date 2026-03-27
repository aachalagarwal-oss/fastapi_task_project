"use client"

import Inputfields from "@/components/inputfields";
import { loginUser } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter();

  const loginMutation=useMutation({
    mutationFn:({email,password}:{email:string,password:string})=>{
      return loginUser(email,password)
    },
    onSuccess:(data)=>{
        localStorage.setItem("token",data.access_token)
         alert("Login successful ");
         router.push("/tasks")
    },
    onError:(error:any)=>{
        alert(error.message || "Login failed")
      }
  })

  const handleClick=()=>{
    loginMutation.mutate({email,password})
  }
  return (
    <div>
      <Inputfields
        labeltext="Username"
        inputtext="Enter your username"
        value={email}
        onInputChange={(val) => setEmail(val)}
      />
      <Inputfields
        labeltext="password"
        inputtext="Enter your password"
        value={password}
        onInputChange={(val) => setPassword(val)}
        type="password"
      />
      <button onClick={handleClick}>{loginMutation.isPending?"Logging in":"Login"}</button>
    </div>
  );
}
