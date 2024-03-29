
import React, {useState, useEffect, useContext}from "react";
import Button from "./Button";
import AuthContext from "../context/AuthContext";

const TaskInput = (props)=> {
    let {user, formatDate} = useContext(AuthContext)
    let currentdate = new Date();    
    const [newTask, setNewTask] = useState({
        title:"",
        body:"",
        due_date:formatDate(currentdate),
    });
    
    const convertUTCtoEST = (utc_date) =>{
        let newDateObject = new Date(utc_date.replace('Z',''));
        let result = formatDate(newDateObject)
        return result
    }
    
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
        console.log(newTask)
    } 

    const handleSubmit = () => {

        props.onSubmit(newTask);
        
        setNewTask((prevTask)=>{
            return{
                ...prevTask,
                title:"",
                body:"",
                created: currentdate,
                updated: currentdate,
                due_date:prevTask.due_date
            }
        
        });
       
    }

    const editCalled=()=>{
            setNewTask(props.editTask);
            console.log(newTask)
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
                    min={currentdate}
                    onChange={handleChange}
                    value={convertUTCtoEST(newTask.due_date)}
                    />
                </div>

                <div className="task-form-group">
                    <label className="">Task Title:</label>
                    <input type="text" name="title" onChange={handleChange} placeholder="Task Header" value={newTask.title} required/>
                    
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