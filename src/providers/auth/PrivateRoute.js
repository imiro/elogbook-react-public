import React from 'react'
import { useAuth } from './_components'
import { Route, Redirect, useLocation } from 'react-router-dom'

export default function PrivateRoute( props ) {
  let auth = useAuth();
/*
  let loc = useLocation()
  console.group('Inside PrivateRoute')
  console.log(auth)
  console.log(loc)
  console.groupEnd()
*/

  if(auth.user && auth.token) {
    return <Route {...props} />
  } else {
    return <Redirect to={{pathname: "/login"}} />
  }

  // return (
  //   <Route
  //     {...rest}
  //     render={({ location }) =>
  //       auth.user ? (
  //         children
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             state: { from: location }
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
}
