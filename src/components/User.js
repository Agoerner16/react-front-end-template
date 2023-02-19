import React, {useState} from 'react';
import { Link } from 'react-router-dom'


const User = (props) => {
    const user = props.user
    return(
        <div>
        <h1>
            {user.username}
        </h1>
        <Link to='/myroutines'>My Routines</Link>
        </div>
    )
}

export default User