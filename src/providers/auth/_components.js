import React,
      { Component, useState, createContext, useContext } from 'react';


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
    if(newToken && !newUser) {
      // TODO fetch user from API here
      newUser = {
        nama: "Aji mock user",
        npm: "1306440032"
      }
      // return; // callback aja yg panggil setToken
    }
    setToken(newToken)
    setUser(newUser)
  }


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

export { AuthContext, useAuth, AuthWrapper }
