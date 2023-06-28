
import React, {useState, useEffect}from "react";
import Button from "./Button";

import { set } from "date-fns";

const TaskInput = (props)=> {
    let currentdate = new Date();
    var datetime = 
                 currentdate.getFullYear()+'-'
                + (currentdate.getMonth()+1)  + "-" 
                +  currentdate.getDate() +' '
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    

    const [newTask, setNewTask] = useState({
        title:"",
        body:"",
        due_date:datetime
   
    });

    
        useEffect(()=>{
            if (props.edit){
                editCalled();
            }
        },[props.edit])
    


    const handleChange = (e) => {
       
        const {name, value} = e.target;
        setNewTask((prevTask) =>{
            return {
                ...prevTask,
                [name]:value
            };
        });
        e.preventDefault();
      
    } 

    const handleSubmit = () => {
        props.onSubmit(newTask);
        
        setNewTask({
            title:"",
            body:"",
            created: datetime,
            updated: datetime,
            due_date:datetime
        });
       
    }

    const editCalled=()=>{
            setNewTask(props.editTask);
    }


    return(
        <div className="task-input">
            <h3 className="center-text todo-title">{props.edit? 'Edit':'Create'} Task:</h3>
         
            <div className="add-format todo-content">

                <div className="task-form-group">
                    <label className="">Due Date:</label>
                    <input 
                    id='due_date'
                    type="datetime-local"
                    name="due_date"
                    min={datetime}
                    onChange={handleChange}
                    
                    />
                </div>

                <div className="task-form-group">
                    <label className="">Task Title:</label>
                    <input type="text" name="title" onChange={handleChange} placeholder="Task Header" value={newTask.title}/>
                </div>

                <div className="task-form-group">
                    <label className="">Task:</label>
                    <textarea name="body" placeholder="Task Body" onChange={handleChange} value={newTask.body}></textarea>
                </div>

            </div>
          
            <Button text={props.edit? 'Edit':'Add'} clickFunction={handleSubmit}/>
        </div>
        
    )
}

export default TaskInput;