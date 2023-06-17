import React from "react";

const CalendarCard = (props)=>{

    const formattedDate = `${props.month+1}/${props.day}/${props.year}`
 
  
    if(props.activeMonth !== props.month){
        return (
            <div style={props.activeMonth !== props.month? {background:	'#FAF9F6'}:null} className={props.today? "day-card-today center-text": "day-card center-text"}>
                <div className="day-card-content">
                <h2 className="date">{props.month +1}/{props.day}</h2>
        
                
                </div>
         
            </div>
            )
    }

    return (
    <div onClick={()=>{props.clickFunction(formattedDate);
    }} className={props.today? "day-card today center-text pressable": "day-card center-text pressable"} style={props.activeDate.toLocaleDateString() === formattedDate? {outline:'solid'}:null}>
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