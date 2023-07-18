import LoginRegister from "../components/LoginRegister";
import React from "react";  

const RegisterPage = ()=>{


    return(
        <section className="container flex-column background">
        <div className="banner">
        <div className="banner-content flex center vertical-center">
            <div className="banner-group"> 
                <h1 className="logo no-margin">iTask</h1>
                <hr/>
                <p className="">Your time is valuable, make the most of it. Simplify your schedule with iTask</p>
            </div>
            <div className="banner-group rounded wrapper-box-shadow">
            
            <LoginRegister register={true}/>
            </div>
        </div> 
        </div>
    
    </section>
    )
}

export default RegisterPage