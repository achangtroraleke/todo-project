import React,{useState, useEffect} from "react";
import TaskList from "./TaskList";
import Calendar from "./Calendar";
import LoadingIcon from "./Loading";

const TaskSection = () =>{
    const [isLoading, setLoading] = useState(true);
    const [selectedDate, setDate] = useState(new Date());
    const [fetchedData, setFetchedData] = useState([])
    const [activeDate, setActiveDate] = useState(selectedDate)

    useEffect(()=>{
       
        getTasksByMonth();
        setLoading(false);
        
    },[isLoading]);

    
    const toggleLoading = (value)=>{
        setLoading(value);
    }

    const getTasksByMonth = async () =>{
        await fetch(`/api/tasks/year/${selectedDate.getFullYear()}/`)
        .then((resp)=> resp.json())
        .then((apiData)=>{
            setFetchedData(apiData);
        });
    }

    const changeMonth = (operator)=>{
 

        if (operator==='add'){
        setDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1));
        }
        else if (operator==='subtract'){
            setDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1));
            console.log(selectedDate)
        }
        else{
            let newYear = operator.split('-')[0];
            let newMonth = Number(operator.split('-')[1]);
           
            setDate(new Date(`${newYear}-${newMonth}`));   
        }
        setLoading(true);
        
        console.log('Selected Date: '+selectedDate)
    }

    const changeSelectedDay = (newDate)=>{
        setActiveDate(new Date(newDate))
        
    }


    
    
    if(isLoading){
        return(
            <LoadingIcon/>
        )
    }

    return(
            <main className="container flex-column">
                <Calendar isLoading = {isLoading} loadingFunction={toggleLoading} apiData={fetchedData.filter(x=> new Date(x.due_date).getMonth()===selectedDate.getMonth())} monthFunction={changeMonth} selectedDate = {selectedDate} activeDate={activeDate} changeDateFunction={changeSelectedDay}/>
                <TaskList isLoading={isLoading} loadingFunction={toggleLoading} apiData={fetchedData.filter(x=> new Date(x.due_date).getMonth()===selectedDate.getMonth())} selectedDate = {selectedDate} activeDate={activeDate}/>
            </main>
    );
}


export default TaskSection