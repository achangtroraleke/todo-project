import React from "react";

const Button = (props) =>{
    
    const handleClick = ()=>{
        props.clickFunction();
    }

    return(
        <button className="button-style todo-box-button" onClick={handleClick}><h3 className="no-margin button-style">{props.text}</h3></button>
    )
}

export default Button;