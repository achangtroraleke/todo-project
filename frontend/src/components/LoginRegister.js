import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

 
const LoginRegister = (props)=>{
    let navigate = useNavigate()
    let {loginUser, user} = useContext(AuthContext)
   



    const registerUser = async (e) =>{
        let response = fetch('/api/create-user/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        }).then((response)=>{
            if (response.status ===200){
                alert("Success. Please Sign-in"); 
                navigate('/welcome')
            }
            else {
                alert('That username is taken.') 
            }
        })

    }

    return(
        
            <div className="flex-column wrapper-box-shadow background  login center">
            <h1 className="no-margin center">Sign-up</h1>
            <form onSubmit={props.register?registerUser:loginUser} className="flex-column form-group">
                <input required className='center-text rounded' type="text" name='username' placeholder="Username"/>
                <input required className='center-text rounded' type="password" name='password' placeholder="Password"/>
                <input className="button-style pressable" type="submit" value={props.register?'Sign-up':'Login'}/>
                {!props.register?<div onClick={()=>{navigate('/register')}} className="button-style pressable" >Register</div>:<div onClick={()=>{navigate('/')}} className="button-style pressable" >Back to login</div>}

            </form>
            
            </div>
       
            

          
       
    )
}

export default LoginRegister