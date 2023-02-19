export const fetchRoutines = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json()
        return result

    } catch (error) {
        throw error
    }
} 

export const fetchActivities = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json()
        return result

    } catch (error) {
        throw error
    }

}

export const fetchUserRoutines = async (username) => {
    const token = window.localStorage.getItem('token');
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        const result = await response.json()
        
        return result
    } catch (error) {
        throw error
    }
}

export const exchangeTokenForUser = async () => {
    const token = window.localStorage.getItem('token');
    
    if(token){
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        })
        const result = await response.json()
        
        return result;
    };
};

export const createActivity = async (ev, name, description) => {
    try {
        ev.preventDefault()
        const token = window.localStorage.getItem('token')
        console.log(token)
        const logURL = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify({
              name: name,
              description: description
            })
          })
          const result = await logURL.json()
          console.log(result)
    } catch (error) {
        throw error

    }
}

export const register = async (ev, username, password) => {
    try {
        ev.preventDefault()
        const regURL = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await regURL.json();
        console.log("user: ", result)
        return result;
    } catch (error) {
        throw error
    }
}

export const login = async (ev, username, password) => {
    try {
        ev.preventDefault()
        const logURL = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
            method:"POST",    
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    username:username,
                    password:password
            })
        })
        const result = await logURL.json();
        const token = result.token;
        window.localStorage.setItem('token', token)
        console.log("user: ", result)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const createRoutine = async (ev, name, goal, isPublic) => {
    try {
        ev.preventDefault()
        const token = window.localStorage.getItem('token')
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
            })
        });
        const result = await response.json()
        console.log(result)
        return result;
    } catch (error) {
        console.error(error);
    };
};

export const deleteRoutine = async (routineId, getMyRoutines, myRoutines, setMyRoutines) => {
    try {
        const token = window.localStorage.getItem('token');
        const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
        console.error(error);
    }
};