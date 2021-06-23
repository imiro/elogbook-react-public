import React,
      { Component, useEffect, useState, createContext, useContext } from 'react';


const AuthContext = createContext()

const useAuth = function() {
  return useContext(AuthContext)
}

const AuthWrapper = function(props) {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  /*
   *
   * Update token and user inside auth context
   * Set token to null to log out
   */
  function updateCredentials(newToken, newUser = null) {
    setToken(newToken)
  }
  
  useEffect(() => {
     if(!token) {
	     setUser(null)
	     return
     }
     fetch(process.env.REACT_APP_API_URL+'/user', {
       headers: {'Authorization': 'Bearer ' + token}
     })
     .then(resp => resp.json())
     .then(obj => setUser(obj))
  }, [token])


  const contextValue = {
    token,
    user,
    // apiProvider, // TODO Refactor outside this, create its own context
    updateCredentials
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

async function attemptPasswordLogin(email, password) {
     return fetch(process.env.REACT_APP_API_URL+'/login', {
	method: "POST",
	body: JSON.stringify({email: email, password: password}),
	headers: {
		'Content-Type': 'application/json'
	}
     })
     .then(function(resp) {
	if(resp.ok) return resp.json()
	throw resp	
     }).then(function (obj) {
	return obj.apiToken
     })
}

export { AuthContext, useAuth, AuthWrapper, attemptPasswordLogin }
