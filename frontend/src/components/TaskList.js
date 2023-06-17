import React,{useState, useEffect} from "react";
import Task from "../components/Task";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import TaskInput from "./TaskInput";
import Button from "./Button";
import { format, set } from "date-fns";
import TaskWindow from "./TaskWindow";
import LoadingIcon from "./Loading";
import { da } from "date-fns/locale";
import Clock from "./Clock";

let TaskList = (props) =>{
    const data = props.apiData;
    let [tasks, setTasks] = useState([]);
    const [newTasks, setNewTask] = useState([]);
    const [dynamicStyle, setStyle] = useState('hidden');
    const [selectTask, setSelectedTask] = useState('');
    const [popUpState, setPopUpState] = useState(false);
    const [listType, setListType] = useState('month');
    

    
    useEffect(()=>{
        setTasks(data)
    }, [props.apiData])

    useEffect(() => {
        console.log(tasks)
        if(listType==='day'){
            setTasks(data.filter(dayTask => new Date(dayTask.due_date).toLocaleDateString() === props.activeDate.toLocaleDateString()))
        }
        else{
            setTasks(data)
        }
     

    }, [props.activeDate])
    
    


    // const handleOnDragEnd = (result) =>{
    //     const{source, destination, type} = result;
    //     if (!result.destination) return
    //     const todos = [...tasks]
    //     const [reorderedItem] = todos.splice(result.source.index, 1)
    //     todos.splice(result.destination.index, 0, reorderedItem);
    //     console.log('source:'+JSON.stringify(type));
        
    // }

    const onAdd = (addedTask) =>{
        console.log('added'+addedTask);
        setNewTask((prevValue)=>{
            return [...prevValue, addedTask]
        })
        console.log('New task:' + newTasks)
    }

    const onDelete = (deletedTask)=>{
        
        setNewTask((prevItems)=>{

            return prevItems.filter((item, index)=>{
                
                return index !== deletedTask.id;
            });
            
        })
        
    }

    let updateTask = async (object) =>{
        console.log('update:'+ object)
        await fetch(`/api/tasks/${object.id}/update/`,{
        method:"PUT",
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify(object)
    });
        props.loadingFunction(true);
    }

    const deleteTask = async (object) =>{
        await fetch(`/api/tasks/${object.id}/delete/`,{
            method:"DELETE",
            headers:{
                "Content-Type":'application/json'
        },
        })
        props.loadingFunction(true);
    }

    const submitTask = async (task_object) =>{
        console.log('task obj '+task_object);
        fetch('/api/tasks/create/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task_object)
        })
        console.log('update db');
    }

    const loopTasks = () =>{
    
        newTasks.map((newTask) =>{
            submitTask(newTask)
        });
        setNewTask([]);
        props.loadingFunction(true);
       
    }

    const enlargeTask = (taskObject)=>{
        setSelectedTask(taskObject);
        setPopUpState(true);
        setStyle('reveal');
        
        
    }

    const closeWindow =()=>{
        setStyle('hidden');
        setSelectedTask('');
        setPopUpState(false);
    }

    const changeView = ()=>{
        
        setTasks(data.filter(dayTask => new Date(dayTask.due_date).toLocaleDateString() === props.activeDate.toLocaleDateString()))
        
    }





    return(
        <div className="container-liquid wrapper">
            <div className={dynamicStyle}>
                <TaskWindow selectedTask={selectTask} active={popUpState} clickFunction={closeWindow} submitFunction={updateTask}/>
            </div>
            <div className="task-section flex-column wrapper-box-shadow">
                
                    <div className="center-text title-box clock">  
                        <Clock/>
                    </div>
                    
                    <div className="todo-list-section flex">
                        <div className="todo-box">

                    <div className="todo-box-header flex-column">
                      
                        <div className="flex selector-section">
                            <div onClick={()=>{setListType('month'); setTasks(data)}} className="todo-box-button center-text pressable" style={listType==='month'? {background:'#F5EFE7'}:null}><h3>Month</h3></div>
                            <div onClick={
                                ()=>{
                                    setListType('day');
                                    changeView();
                                    }} className="todo-box-button pressable center-text" style={listType==='day'? {background:'#F5EFE7'}:null}>{listType==='day'?<h3>{props.activeDate.toLocaleDateString()}</h3>:<h3>Day</h3>}
                            </div>
                        </div>
                    </div>
                    <div className="task-feed todo-content">
                        {tasks.map((task, index)=>{
                            if(task.completed===false){
                                return(<Task id={task.id} key={task.id} title={task.title} body={task.body} due_date={task.due_date} completed={task.completed} clickFunction={enlargeTask} updateFunction={updateTask} deleteFunction={deleteTask}/>
                                )
                            }
                        })}
                    </div>
                        </div>

                        <div className="todo-box">
                        <h3 className="center-text todo-title">Unassigned Task</h3>
                            <div className="task-feed todo-content">

                            
                            
                            
                            {newTasks.map((newTask, index) =>{
                                return <Task id={index} key={index} title={newTask.title} body={newTask.body} due_date={newTask.due_date} is_unassigned={true} clickFunction={onDelete}/>
                            })}
                            </div>
                            
                            <Button className='button-style' text='Submit New Task' clickFunction={loopTasks}/>
                        </div>

                        <div className="todo-box">
                        <TaskInput onSubmit={onAdd}/>
                        </div>
                    </div>
                    
                </div>
        </div>
    )
}

export default TaskList;