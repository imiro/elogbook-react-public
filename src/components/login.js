import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import { useAuth } from '../providers/auth'
import './sb-admin-2.css'

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

  function handleSSOLogin(e) {
    e.preventDefault()
    if(process.env.REACT_APP_MOCK_USER) {
	processTokenUpdate("toKen123")    
	return
    }

    window.updateUserCredentials = function(token) {
      processTokenUpdate(token)
    }
    window.addEventListener('message', function(e) {
		if(e.data.message == "deliverToken") {
			let tkn = e.data.result
			e.source.close()
			processTokenUpdate(tkn)
		}
	})
    let child = window.open(url)
    let interval = setInterval(function() {
		try {
			child.postMessage({message: "requestToken"}, "*")
		} catch(e) {
			if(child.closed) {
				clearInterval(interval)
				return
			}
		}
	}, 500)
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
  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-form-title" >
          <span className="login100-form-title-1">
            Logbook Praktik Klinik Program Studi Pendidikan Dokter FKUI
          </span>
        </div>

        <form className="login100-form validate-form"  action="" >

          <div className="container-login100-form-btn">
            <input id="login-submit" type="submit" value="Login with SSO-UI" className="btn btn-lg btn-success btn-block" onClick={handleSSOLogin} />
          </div>

        </form>
      </div>
    </div>
  </div>

    )
  }
}
