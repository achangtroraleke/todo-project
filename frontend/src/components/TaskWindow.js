import React from "react";
import TaskInput from "./TaskInput";


let TaskWindow = (props)=>{
    const task_object = props.selectedTask;
 

    const handleClick=()=>{
        props.clickFunction();
    }


    return(
        <div className="task-popup ">
            <h3 className="exit-button pressable" onClick={handleClick}>Exit</h3>
            <TaskInput edit={props.active} editTask={task_object} onSubmit={props.submitFunction}/>
        </div>
    )
}

export default TaskWindow;