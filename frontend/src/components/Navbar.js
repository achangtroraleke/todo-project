import React,{useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

let Navbar = (props) =>{
    let {user, logoutUser} = useContext(AuthContext)
    const handleClick = (e)=>{
        props.setPageFunction(e.target.id)
    }

    return(

        <div className="navbar">
            <div className="navbar-nav flex center">
            <h1 className="logo no-margin">iTask</h1>
            
            {!props.isDesktop?
            <ul className="nav-group flex">
                <li id="calender" className="nav-item pressable" onClick={handleClick} >
                <svg className="vertical-center" style={{pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                </li>
                <li id="summary" className="nav-item pressable" onClick={handleClick}>
                <svg className="vertical-center" style={{pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M351-120q-97 0-164-67t-67-164v-258q0-97 67-164t164-67h258q97 0 164 67t67 164v258q0 97-67 164t-164 67H351Zm88-205 240-240-43-43-197 197-97-97-43 43 140 140Zm-88 145h258q71 0 121-50t50-121v-258q0-71-50-121t-121-50H351q-71 0-121 50t-50 121v258q0 71 50 121t121 50Zm129-300Z"/></svg>
                </li>
                <li id='list' className="nav-item pressable" onClick={handleClick}>
                <svg className="vertical-center" style={{pointerEvents:'none'}} id='list' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M149.825-280Q137-280 128.5-288.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137-450 128.5-458.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137-620 128.5-628.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5ZM290-280v-60h550v60H290Zm0-170v-60h550v60H290Zm0-170v-60h550v60H290Z"/></svg>
                </li>
                
                {user?<li onClick={logoutUser} id='login' className="nav-item pressable flex" >
                <svg className="vertical-center" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>
                <h3 >Logout</h3>
               </li>
               :<li id='login' className="nav-item pressable flex" >
                <Link to={'/login'} style={{height:'inherit'}} className="flex">
                <svg className="vertical-center" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>
                <h3 className="">Login</h3>
                </Link>
               </li>}

            </ul>:
            <ul className="nav-group flex">
                {user?<li onClick={logoutUser} id='login' className="nav-item pressable flex" >
                <svg className="vertical-center" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>
                <h3 className="">Logout</h3>
               </li>
               :<li id='login' className="nav-item pressable flex" >
                <Link to={'/login'} style={{height:'inherit'}} className="flex">
                <svg className="vertical-center" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>
                <h3 className="">Login</h3>
                </Link>
               </li>}
            </ul>}
        
            </div>
        </div>
    )
}

export default Navbar;