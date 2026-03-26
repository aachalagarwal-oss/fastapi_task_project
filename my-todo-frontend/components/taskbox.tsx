import Tasks from "@/app/tasks/page";
import { gettask } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
type Task={
  title:string,
  description:string,
  id:number,
  created_at:string
}
export default function Taskbox(){

  const {data,isLoading,isError}=useQuery<Task[]>({
    queryKey:["tasks"],
    queryFn:()=>gettask()
  })

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error..</div>
  return(
    <>
    {data?.map((task)=>{
      const date=new Date(task.created_at);
        return(
      <div className="m-5" key={task.id}>
      
        <div  className="border-4 p-4 m-auto gap-6">
          <div>{task.title}</div>
        
        <div>{task.description} <span ><button className="ml-20">Completed</button></span></div>
        
        <div>Created at : {date.toLocaleDateString()} on {date.toLocaleTimeString()}</div>
       
        </div>
      </div>
       );
})}
    </>
  )




//     return(
      
//          <div className="m-5">
//         <div className="border-4 p-4 m-auto gap-6">
//           <div>{data?.[0]?.title}</div>
//           <div>{data?.[0]?.description}
//             <span ><button className="ml-20">Completed</button></span>
//           </div>
//           <div>Username
//             <span>Date time</span>
//           </div>
            
//         </div>
        
//       </div>
//     );
}