import React, {useState} from 'react';


const Routines = (props) => {
    const routines = props.routines

    return(
      <div>
          <h1>
              Routines ({routines.length})
          </h1>
          <hr></hr>
          <ul>
            {routines.map( (routine) => {
                return(
                    <div className="routDiv" key={routine.id}>
                        <h3>{routine.name}</h3>
                        <p className="indent">{routine.goal}</p>
                        <p className="indent"> By: {routine.creatorName}</p>
                            {routine.activities.map( (activity) => {
                            return(<div className="actDiv" key={activity.id}>
                                <h4 className="indent">{activity.name}</h4>
                                <p className="doubleInd">{activity.description}</p>
                                <p className="doubleInd">Count: {activity.count}</p>
                                <p className="doubleInd">Duration: {activity.duration}</p>
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

export default Routines