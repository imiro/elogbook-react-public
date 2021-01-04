import React from 'react'
import { useAuth } from './_components'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute( props ) {
  let auth = useAuth();
  console.log(auth)

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
