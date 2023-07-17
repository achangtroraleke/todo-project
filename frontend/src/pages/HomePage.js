import React, {useState, useEffect} from "react";
import TaskSection from "../components/TaskSection";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "react-responsive";


let Home = () => {
    const [activePage, setPage]  = useState('calender');
    const setPageFunction = (pageName) =>{
        setPage(pageName)
    }  
    const isDesktop = useMediaQuery({
        query:'(min-width: 1000px'
    })

    console.log(isDesktop)
    console.log(activePage)
    return(
        <section className="">
        <Navbar setPageFunction={setPageFunction} isDesktop={isDesktop}/>
        <TaskSection activePage={activePage} isDesktop={isDesktop}/>
        </section>

    )
}

export default Home;