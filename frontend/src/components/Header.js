import React from "react";
import { useParams, useNavigate } from "react-router-dom";
let Header = () =>{
    const navigate = useNavigate();
    
    let handleClick = ()=>{
        navigate('/');
    }

    return(

        <div className="navbar">
            <ul className="navbar-nav">
                <li onClick={handleClick} className="nav-item">iTask</li>
            </ul>
            
        </div>
    )
}

export default Header;