import React,{useState, useEffect} from "react";

const CalendarCard = (props)=>{

    const formattedDate = `${props.month+1}/${props.day}/${props.year}`



    if(props.activeMonth !== props.month){
        return (
            <div style={props.activeMonth !== props.month? {background:	'none', color:'gray'}:null} className="day-card center-text">
                <div className="day-card-content">
                <h2 className="date">{props.month +1}/{props.day}</h2></div>

            </div>
            )
    }
    if(props.today && props.activeMonth===props.month){
        return(
            <div id="card" onClick={()=>{props.clickFunction(formattedDate);
            }} className="day-card today center-text pressable" style={props.activeDate.toLocaleDateString() === formattedDate? {outline:'solid'}:null}>
                <div className="day-card-content">
                <h2 className="date">{props.month +1}/{props.day}</h2>
                <div className="task-calendar-box">
                <p>Tasks </p>
                <h3>{props.tasksInDay.filter(task=> task.completed===false).length}</h3>
                </div>
                
                </div>

            </div>
        )
    }

    return (
    <div id="card" onClick={()=>{props.clickFunction(formattedDate);
    }} className= "day-card center-text pressable" style={props.activeDate.toLocaleDateString() === formattedDate? {outline:'solid'}:null}>
        <div className="day-card-content">
        <h2 className="date">{props.month +1}/{props.day}</h2>
        <div className="task-calendar-box">
        <p>Tasks </p>
        <h3>{props.tasksInDay.filter(task=> task.completed===false).length}</h3>
        </div>
        
        </div>
 
    </div>
    )
}

export default CalendarCard;