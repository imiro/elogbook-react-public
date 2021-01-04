import React from 'react'
import { useAuth } from '../providers/auth'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { user } = useAuth()
  return (
    <div>
      <div>Welcome, {user.name}!</div>
      <div><Link to="/dashboard">Dashboard</Link></div>
    </div>
  )
}
