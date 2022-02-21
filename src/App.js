import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './firebase-config';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // const signOut = () => firebase.auth().signOut()

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isSignedIn?<Dashboard/>:<Navigate to="/login"/>} />
        <Route path="/login" 
          element={!isSignedIn?<Login isSignedIn={isSignedIn}/>:<Navigate to="/"/>} 
        />
        <Route path="*" element={isSignedIn?<Navigate to="/"/>:<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
