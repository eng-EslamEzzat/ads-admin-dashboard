import React from 'react'
import firebase from 'firebase/compat/app';

const Dashboard = () => {
  return (
    <>
        <div>Dashboard</div>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </>
  )
}

export default Dashboard