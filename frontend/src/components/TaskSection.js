import React,{useState, useEffect, forwardRef, useContext} from "react";
import TaskList from "./TaskList";
import Calendar from "./Calendar";
import LoadingIcon from "./Loading";
import TaskSummary from "./TaskSummary";
import AuthContext from "../context/AuthContext";


const TaskSection = (props) =>{
    const [isLoading, setLoading] = useState(true);
    const [selectedDate, setDate] = useState(new Date());
    const [fetchedData, setFetchedData] = useState([])
    const [activeDate, setActiveDate] = useState(selectedDate)
    let {user, authTokens} = useContext(AuthContext)
    

    useEffect(()=>{
        getTasksByMonth();
        setLoading(false);
        
    },[isLoading]);
    
    
    const toggleLoading = (value)=>{
        setLoading(value);
    }

    // const getTasksByMonth = async () =>{
    //     await fetch(`/api/tasks/year/${selectedDate.getFullYear()}/`)
    //     .then((resp)=> resp.json())
    //     .then((apiData)=>{
    //         setFetchedData(apiData);
    //     });
    // }

    const getTasksByMonth = async () =>{
        console.log(authTokens.access)
         let response = await fetch(`/api/tasks/year/${selectedDate.getFullYear()}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
         })

         let data = await response.json()
         setFetchedData(data)
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
            <main className="container flex-column top-header">
                    {user?<h2 className="center-text">WELCOME {user.username.toUpperCase()}</h2>:null}
                    <Calendar active={props.activePage==='calender'} isDesktop={props.isDesktop} isLoading = {isLoading} loadingFunction={toggleLoading} apiData={fetchedData.filter(x=> new Date(x.due_date).getMonth()===selectedDate.getMonth())} monthFunction={changeMonth} selectedDate = {selectedDate} activeDate={activeDate} changeDateFunction={changeSelectedDay}/>
                    <TaskList active={props.activePage==='list'} isDesktop={props.isDesktop} isLoading={isLoading} loadingFunction={toggleLoading} apiData={fetchedData.filter(x=> new Date(x.due_date).getMonth()===selectedDate.getMonth())} selectedDate = {selectedDate} activeDate={activeDate} />
                    <TaskSummary active={props.activePage==='summary'} isDesktop={props.isDesktop} apiData={fetchedData} selectedDate = {selectedDate} activeDate={activeDate}/>
            </main>
            
    );
}


export default TaskSection