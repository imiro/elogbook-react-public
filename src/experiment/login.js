import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import { useAuth } from '../providers/auth'

export default function LoginPage() {

  const url = process.env.REACT_APP_API_URL + "/sso_login"
  let [tkn, setTkn] = useState(null)
  let [user, setUser] = useState(null)

  let { token, updateCredentials } = useAuth()
    // let history = useHistory();
    // let location = useLocation();

  function processTokenUpdate(tok) {
    setTkn(tok)
    // setTimeout(() => {}, 2000)
  }

  function handleSSOLogin() {
    window.updateUserCredentials = function(token) {
      processTokenUpdate(token)
    }
    window.open(url)
  }

  useEffect(function() {
    updateCredentials(tkn, user)
  }, [user])

  useEffect(function() {
    if(!tkn) return;

    fetch(process.env.REACT_APP_API_URL+'/user', {
      headers: {'Authorization': 'Bearer ' + tkn}
    })
    .then(resp => resp.json())
    .then(obj => setUser(obj))
  }, [tkn])

  if(user) {
    // TODO redirect to original location, using callbacks
    // SEE https://reactrouter.com/web/example/auth-workflow

    return <Redirect to="/home" />

    return (
      <div>
        <div>User: <pre>{JSON.stringify(user)}</pre></div>
      </div>
    )
  } else {
    return (
      <div>
        <div><button onClick={handleSSOLogin}>Log In with SSO-UI</button></div>
      </div>

    )
  }
}
