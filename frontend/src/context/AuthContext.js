import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    let [loading, setLoading] = useState(true)

    const formatDate = (data) =>{
        let currentdate =new Date(data)
        let output = new Date(currentdate.toLocaleString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
        let formatResult = output.toLocaleString().replace('T',' ').replace('-','/')
        // console.log('formatted with date: ' + new Date(formatResult).toLocaleString())
        let test = output.replace('Z','')
        return (output)
    }

    
    const navigate = useNavigate();

    let loginUser = async (e)=>{
        
        e.preventDefault()
        
        let response = await fetch("/api/token/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data =  await response.json()
        if(response.status ===200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log(user)
            navigate('/')
            
        }else{
            alert('Something went wrong!')
        }
    }

    let logoutUser = ()=>{
        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=>{
        
        let response = await fetch("/api/token/refresh/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })
        let data =  await response.json()
        if (response.status === 200){
            console.log('update')
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
    }
    

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        formatDate:formatDate
    }
    
    useEffect(() =>{
        let fifteenMinutes = 1000 * 600 *15
        console.log('Refresh Called')
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fifteenMinutes)
        return()=> clearInterval(interval)
    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
