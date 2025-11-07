import React, { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import {ToastContainer} from "react-toastify";
import { createTask, deleteTaskById, getAllTask, updateTaskById } from "../api";
import { notify } from "../utils";
const TaskManager = () => {
    const [input,setInput] = useState("")
    const [tasks,setTasks] = useState([])
    const [copyTasks,setCopyTasks] = useState([])
    const [updateTask,setUpdateTask] = useState(null)
    const handleTask = ()=>{
      if(updateTask && input){
        //update/put api call
        console.log("update task")
        const obj = {
          taskName:input,
          isDone: updateTask.isDone,
          _id: updateTask._id
        }
        updateItem(obj)
        setInput("")
      }else if(updateTask === null && input){
        // create task
        console.log("created api call");
        
        addTask()
      }
    }

    useEffect(()=>{
      if(updateTask){
        setInput(updateTask.taskName)
      }
    },[updateTask])


    const addTask = async() => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const {success,message} = await createTask(obj)
            // console.log(data);
            
            if(success){
                notify(message,'success')
                setInput("")
            }else{
                notify(message,'error')
            }
            fetchAllTasks()
            
        } catch (error) {
            console.error(error)
            notify('failed to create task','error')

        }
    }

    const fetchAllTasks = async()=>{
         try {
            const {data} = await getAllTask()
            // console.log(data);
            setTasks(data)
            console.log(data);
            
            setCopyTasks(data)
        } catch (error) {
            console.error(error)
            notify('failed to get task','error')

        }
    }

    useEffect(()=>{
        fetchAllTasks()
    },[])

    
    const deleteTask = async(id)=>{
      try {
            const {success,message} = await deleteTaskById(id)
            // console.log(data);
              
            if(success){
                notify(message,'success')
                setInput("")
            }else{
                notify(message,'error')
            }
            fetchAllTasks()
        } catch (error) {
            console.error(error)
            notify('failed to get task','error')
        }
    }

    const CheckAndUncheck = async(item) =>{
      const {_id,isDone,taskName} = item;

      const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const {success,message} = await updateTaskById(_id,obj)
            // console.log(data);
            
            if(success){
                notify(message,'success')
                
            }else{
                notify(message,'error')
            }
            fetchAllTasks()
            
        } catch (error) {
            console.error(error)
            notify('failed to create task','error')

        }
    }

    const updateItem = async(item)=>{
      const {_id,isDone,taskName} = item;

      const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const {success,message} = await updateTaskById(_id,obj)
            // console.log(data);
            
            if(success){
                notify(message,'success')
                
            }else{
                notify(message,'error')
            }
            fetchAllTasks()
            
        } catch (error) {
            console.error(error)
            notify('failed to create task','error')

        }
    }

    const handleSearch = (e)=>{
      const term = e.target.value.toLowerCase();
      const oldTask = [...copyTasks]
      const result = oldTask.filter((item)=>item.taskName.toLowerCase().includes(term))
      setTasks(result)
    }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto items-center">
      <h1 className="text-4xl font-semibold">Task Manager App</h1>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex items-center">
          <input type="text" placeholder="write task.." className="py-2 border rounded-md border-zinc-100 px-3"
          value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          <button className="px-3 rounded-md py-3 m-2 bg-blue-600 cursor-pointer"
          onClick={handleTask}
          ><FaPlus /></button>
        </div>
        <div className="flex items-center ">
          {/* Search */}
          <input 
          onChange={handleSearch}
          type="text" placeholder="search.."  className="py-2 border rounded-md border-zinc-100 px-5"/>
        </div>
      </div>

      {/* list of items */}
      <div className="flex flex-col">
        {
          tasks && tasks.map((item,idx)=>(
            <div key={idx}  className="m-2 p-2 border flex border-amber-50 rounded-md w-96 justify-between items-center">
            <span className={item.isDone ? "line-through":""}>{item.taskName}</span>
            <div className="flex ">
                <button onClick={()=>CheckAndUncheck(item)} className="bg-green-500 px-2 py-2 rounded-md m-1 cursor-pointer text-white">
                    <FaCheck />
                </button>
                <button onClick={()=>setUpdateTask(item)} className="bg-gray-500 px-2 py-2 rounded-md m-1 cursor-pointer text-white">
                    <FaPencilAlt />
                </button>
                <button onClick={()=>deleteTask(item._id)} className="bg-red-500 px-2 py-2 rounded-md m-1 cursor-pointer text-white">
                    <FaTrash />
                </button>
                
            </div>
        </div>
          ))
        }

      </div>

      {/* toastify */}
        <ToastContainer 
position="top-right"
autoClose={3000}
hideProgressBar={false}
        />

    </div>
  );
};

export default TaskManager;
