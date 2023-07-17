import React from "react";
import Task from "./Task";

const TaskSummary = (props)=>{
    const data = props.apiData;    
    return(
        <div id="summary" className={"container-liquid wrapper summary " + (!props.isDesktop && !props.active? 'hidden':null)}>
            <div className="task-section flex-column wrapper-box-shadow">
            <div className="center-text title-box">  
                <h1>All Tasks of {props.activeDate.toLocaleString('default',{year:'numeric'})}</h1>
            </div>
                <div  className="todo-list-section flex summary">
                    <div className="todo-box background rounded">
                        <h3 className="center-text todo-title">Completed ({data.filter(task => task.completed===true).length})</h3>
                        <div className="task-feed todo-content ">
                        {data.map((task, index)=>{
                            if(task.completed===true){
                                return(<Task id={task.id} key={task.id} title={task.title} body={task.body} due_date={task.due_date} completed={task.completed} summary={true}/>
                                )
                            }
                        })}
                        </div>
                    </div>
                    <div className="todo-box background rounded" style={{background:'#F47174 '}}>
                    <h3 className="center-text todo-title " style={{background:'#F47174' }}>Incomplete ({data.filter(task => task.completed===false).length})</h3>
                        <div className="task-feed todo-content">
                        {data.map((task, index)=>{
                            if(task.completed===false){
                                return(<Task id={task.id} key={task.id} title={task.title} body={task.body} due_date={task.due_date} completed={task.completed} summary={true}/>
                                )
                            }
                        })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TaskSummary;
