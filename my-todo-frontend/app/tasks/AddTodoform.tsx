import InputBox from "./InputBox"

const AddTodoForm=({title,desc ,setTitleChanged,
  setDescChanged,}:{title:string,desc:string,setTitleChanged: (title: string) => void;
  setDescChanged: (desc: string) => void;})=>{
    return(
        <div>
            <InputBox  labeltext="Title" inputtext="Enter your title" value={title} onInputChange={setTitleChanged}/>
            <InputBox labeltext="Description" inputtext="Enter the description" value={desc} onInputChange={setDescChanged}/>
        </div>
    )
}

export default AddTodoForm;