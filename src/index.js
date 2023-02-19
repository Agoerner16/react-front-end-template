import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Routes, Route } from "react-router-dom";
import { fetchRoutines, fetchActivities, login, exchangeTokenForUser } from "./api";

import {
  Login,
  Register,
  Activities,
  Routines,
  MyRoutines,
  Home,
  User,
  CreateActivity,
  CreateRoutine
} from "./components/index";

  const App = () => {
    const [user, setUser] = useState({})
    const [routines, setRoutines] = useState([])
    const [activities, setActivities] = useState([])
    const [myRoutines, setMyRoutines] = useState([])
   
  const getRoutines = async ()=>{
    const newRoutines = await fetchRoutines()
    setRoutines(newRoutines)
  }
  const getActivities = async ()=>{
    const newActivities = await fetchActivities()
    setActivities(newActivities)
  }

  const getUser = async ()=>{
    if(window.localStorage.getItem('token')){
      const newUser = await exchangeTokenForUser()
      setUser(newUser)
    } else {
      setUser({})
    }
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }
  useEffect(()=> {
    getRoutines()
    getActivities()
    getUser()
  },[])

  return (
    <div>
      <div className='content'>
        <div className='left'>
          { user.id ? <div> <User user={user}/> <button onClick={ () => {logout()} }>Logout</button></div> : <div> <Register /> <Login setUser={setUser}/> </div>}
        </div>
        <div className='mid'>
        <nav>
          <Link to="/routines">Routines</Link>
          <Link to="/activities">Activities</Link>
        </nav>
        <Routes>
          <Route path='/' element = {<h1>Home</h1>}/>
          <Route path='/routines' element = {<Routines routines={routines}/>}/>
          <Route path='/activities' element = {<Activities activities={activities}/>}/>
          <Route path='/myroutines' element = {<MyRoutines user={user} myRoutines={myRoutines} setMyRoutines={setMyRoutines}/>}/>
        </Routes>
        </div>
        <div className='right'> 
          { user.id ? <div><CreateActivity CreateActivity={CreateActivity}/></div> : <h3>Login required to create Routines and Activities</h3> }
          { user.id ? <div><CreateRoutine CreateRoutine={CreateRoutine} myRoutines={myRoutines} setMyRoutines={setMyRoutines}/></div> : null }
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

