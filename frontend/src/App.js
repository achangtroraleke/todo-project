import {
  BrowserRouter as Router,
  Route,
  Routes,
}
from 'react-router-dom'
import './App.css';
import React,{Fragment} from 'react';
import Home from './pages/HomePage';
import PrivateRoute  from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  
  return (

    <Router >
      <AuthProvider>
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/' element={<PrivateRoute/>}>
            <Route  path='/home' element={<Home/>}/>
          </Route>
          <Route path='/register' element={<RegisterPage/>}/>
          
            
      </Routes>
      </AuthProvider>
    </Router>
   
  );
}

export default App;
