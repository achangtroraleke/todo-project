import React,{useEffect, useState} from "react";


const Clock = () =>{
    const [time, setTime] = useState({
        hours:null,
        minutes:null,
        ap:'AM'
    });


    useEffect(() =>{
    getCurrentTime();
    },[])

    const getCurrentTime = ()=>{

        setInterval(()=>{
            let currentdate = new Date();
            let hh = currentdate.getHours();
            let mm = currentdate.getMinutes();
            let ss = currentdate.getSeconds();
            let newAP = 'AM'
            if (hh/12>=1){
                
                newAP='PM'
                
            }
            if(mm<10){
                mm="0"+mm;
            }
            if(ss<10){
                ss='0'+ss;
            }
        
            setTime({
                hours:hh,
                minutes:mm,
                seconds:ss,
                ap:newAP
            });
            
        }, 1000)
        
      
    }


    return(
        <div className="clock">
            {!time.hours && !time.minutes ?<h4>Loading Time...</h4>:
            <h1>Current Time: {(time.hours+11) %12+1}:{time.minutes}:{time.seconds}{time.ap}</h1>}

        </div>
    )
}

export default Clock;