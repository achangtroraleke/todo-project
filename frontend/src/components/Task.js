import React,{useContext, useEffect, useState,} from "react";
import {Link, useNavigate,} from  'react-router-dom';
import { format, set } from "date-fns";
import AuthContext from "../context/AuthContext";





let Task = (props) => {
    let {formatDate} = useContext(AuthContext)
    let [task, setTask] = useState(props);

    let formattedDate = ()=>{
        let datetimeData =new Date(props.due_date);
        let formattedData = format(datetimeData, 'yyyy/MM/dd h:mm:ss aa');
        return formattedData
    }

    const handleClick = ()=>{
        props.clickFunction(props);
        
    }

    const handleCheck = (action)=>{
        if(action==='update'){
            props.updateFunction({...task, 'completed':!props.completed});
            
        }
        else if(action==='delete'){
            props.deleteFunction(task)
        }
    }

    if(props.summary){
        return(
            <div className="task-item">
                <div className="task-container">
                    <p className="task-title">{props.title}</p>
                    <p className="task-body">{props.body}</p>
                    <small >Due Date: {new Date(props.due_date).toLocaleString()}</small>
                </div>
            </div>
        )
    }


    return(
        <div className="task-item" >
        {props.is_unassigned?null:<svg onClick={()=>{handleCheck('delete')}} className="checkmark-img delete-img pressable" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48"><path d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Z"/></svg>}
        <div onClick={handleClick} className="task-container pressable">
            <p className="task-title">{props.title}</p>
            <p className="task-body">{props.body}</p>
            <small >Due Date: {new Date(props.due_date).toLocaleString()}</small>
        </div>
        {props.is_unassigned?<svg onClick={handleClick} className="checkmark-img delete-img pressable" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>:
        <svg onClick={()=>{handleCheck('update')}} className="checkmark-img pressable" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
        </div>
    )
}

export default Task;