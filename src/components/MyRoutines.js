import React, {useState, useEffect} from 'react';
import { deleteRoutine, fetchUserRoutines } from '../api';




const MyRoutines = ({user, myRoutines, setMyRoutines}) => {
    
    const getMyRoutines = async() => {
        const routines = await fetchUserRoutines(user.username)
        setMyRoutines(routines)
    } 
    
    useEffect(() => {
        if(user.username){
            getMyRoutines()
        }
    }, [user])

    return(
      <div>
          <h1>
              My Routines ({myRoutines.length})
          </h1>
          <hr></hr>
          <ul>
            {myRoutines.map( (routine) => {
                return(
                    <div className="routDiv" key={routine.id}>
                        <h3>{routine.name}</h3>
                        <p className="indent">{routine.goal}</p>
                        <button onClick={()=> {deleteRoutine(routine.id), getMyRoutines, myRoutines, setMyRoutines}}>Delete</button>
                            {routine.activities.map( (activity) => {
                            return(<div key={activity.id}>
                                <p className="indent">activities:{activity.name}</p>
                                <p className="doubleInd">{activity.description}</p>
                                <p className="doubleInd">{activity.duration}</p>
                                <p className="doubleInd">{activity.count}</p>
                                </div>
                            )
                        } 
                      

                        )}
                    </div>
                );
            })}
            </ul>  
          
      </div>
    )
}

export default MyRoutines