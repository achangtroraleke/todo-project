import React, {useState, useEffect, useContext} from "react";
import CalendarCard from "./CalendarCard";
import AuthContext from "../context/AuthContext";



let Calendar = (props) => {

    const selectedDate = props.selectedDate;
    const month = selectedDate.getMonth();
    const [daysInMonth, setDaysInMonth] = useState([]);
    const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
    const tasksForTheMonth  = props.apiData;
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    let {formatDate} = useContext(AuthContext)
    

    useEffect(()=>{   
       
        getDaysInMonth();
       
    },[props.isLoading]);


    const getDaysInMonth = ()=>{
        let startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(),1);
        let dateList = [];
        if(startDate.getDay()!==0){

            for(let i=0; i<startDate.getDay(); i++){
                let dayBefore = new Date(selectedDate.getFullYear(), selectedDate.getMonth(),1);
                dayBefore.setDate(dayBefore.getDate()-(i+1));
                dateList.unshift(new Date(dayBefore));
               
            }
        
        }
        while (startDate.getMonth()===month){
            dateList.push(new Date(startDate));
            startDate.setDate(startDate.getDate()+1);
        }
        setDaysInMonth(dateList);
       
    }

    const handleChange = (e) => {
       
        const newDate = e.target.value;
        props.monthFunction(newDate);
        
      
    } 

    const clickFunction=(operator)=>{
        props.monthFunction(operator)

    }



    const handleClick = (date)=>{
        props.changeDateFunction(date)
        console.log(document.querySelector('#id.container-liquid'))
    }

    

    return (
    
    <div id="calender" className={"container-liquid calender-element calender " }>
        <div className={"calender-container wrapper-box-shadow "}>

            <div className="calender-header flex">

            <div className="arrow-button pressable " onClick={()=>{
                clickFunction('subtract');
            }}>
                <svg className="back-arrow" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 96 960 960" width="48"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
            </div>
            
            <div className="header-title flex">
                <input onChange={handleChange} type="month" value={new Date(selectedDate).toISOString().slice(0,7)}></input>
                <h2 className="no-margin">{monthNames[month]} {selectedDate.getFullYear()} Tasks:{tasksForTheMonth.filter(x => x.completed === false).length}</h2>
            </div>

                <div className="arrow-button pressable" onClick={()=>{
                    clickFunction('add');
                }}><svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 96 960 960" width="48"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                </div>
                
            </div>

            <div className={"calendar " + (!props.isDesktop && !props.active? 'hidden':null)}>
                <div className="days-of-week flex">
                {weekday.map((dayName, index)=>{
                return(
                    <div key ={index} className="day-container">
                <h3 className="day-label center-text no-margin vertical-center">{dayName}</h3>
                </div>)
            })}
                </div>

            {daysInMonth.map((day, index)=>{
                let tasksForDay= (tasksForTheMonth.filter(e => new Date(e.due_date).toLocaleDateString() === day.toLocaleDateString()));
               

                if(day.toLocaleDateString() === new Date().toLocaleDateString()){
                    return(
                    <CalendarCard  key={index} activeMonth={selectedDate.getMonth()} month={day.getMonth()} day={day.getDate()} year={day.getFullYear()} dayName={weekday[day.getDay()]} tasksInDay={tasksForDay} today={true} clickFunction={handleClick} activeDate={props.activeDate} />
                    )
                }
                return(
                   
                    <CalendarCard key={index} activeMonth={selectedDate.getMonth()}  month={day.getMonth()} day={day.getDate()} year={day.getFullYear()} dayName={weekday[day.getDay()]} tasksInDay={tasksForDay} today={false} clickFunction={handleClick} activeDate={props.activeDate}/>
                    
                )
            })}
            </div>

        </div>
    </div>
    )
}


export default Calendar;