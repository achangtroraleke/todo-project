import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

 
const LoginRegister = ()=>{
    let {loginUser, user} = useContext(AuthContext)
    const [isRegistering, setRegister] = useState('')

    const registerUser = async (e) =>{
        let response = fetch('/api/create-user/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        if((await response).status !==200){
            alert('Server Error occured during Sign-up. Please try again.')
        }else{
            alert('Registration Successful, Please Sign-in.')
        }
      
    }

    return(
        <div className="flex-column">
            <div className="flex-column wrapper-box-shadow background rounded login center">
            <h1 className="no-margin center">Login/Sign-Up</h1>
            <form onSubmit={isRegistering?registerUser:loginUser} className="flex-column form-group">
                <input required className='center-text rounded' type="text" name='username' placeholder="Username"/>
                <input required className='center-text rounded' type="password" name='password' placeholder="Password"/>
                <input className="button-style pressable" type="submit" value='Login'/>
                <input onClick={()=>{setRegister(true)
                }} className="button-style pressable" type="submit" value='Register'/>
            
            </form>
            </div>
       
            

            </div>
       
    )
}

export default LoginRegister