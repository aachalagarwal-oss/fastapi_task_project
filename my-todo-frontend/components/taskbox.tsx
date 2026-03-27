import { gettask, updatetask } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
type Task = {
  title: string;
  description: string;
  id: number;
  created_at: string;
  status: string;
};
export default function Taskbox() {
 
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => gettask(),
  });
  const mutate = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return updatetask(id, status);
    },
    onError: (error: any) => {
      alert(error.message || "Task couldn't be completed");
    },
  });
  const [completedTask, setcompletedTask] = useState<number[]>([]);
  function handleClick( id: number) {
    const isCompleted=completedTask.includes(id)
    const newStatus=isCompleted?"completed":"pending"
      
    if (completedTask.includes(index)) {
      setcompletedTask(completedTask.filter((i) => i !== index));
    } else {
      setcompletedTask([...completedTask, index]);
      
    }
    mutate.mutate({ id, status :newStatus});

      
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>;
  return (
    <>
      {data?.map((task, index) => {
        const date = new Date(task.created_at);
        const isCompleted = completedTask.includes(index);
        return (
          <div className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-200" key={index}>
            <div className="border-4 p-4 m-auto gap-6">
              <div className={`text-xl font-semibold ${isCompleted ? "line-through text-gray-400" : "text-black"}`}>
                {task.title}
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xl font-semibold ${isCompleted ? "line-through text-gray-400" : "text-black"}`}
                >
                  {task.description}
                </span>

                <button
                  onClick={() => handleClick(index, task.id, task.status)}
                  className=" text-black px-3 py-1 rounded"
                >
                  ☑
                </button>
              </div>

              <div className={`text-xl font-semibold ${isCompleted ? "line-through text-gray-400" : "text-black"}`}>
                Created at : {date.toLocaleDateString()} on{" "}
                {date.toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
