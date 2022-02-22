import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import {setIsSignedIn} from './redux/actions'
import LoadingComponent from './components/react-loading';
import NavBar from './components/navbar';
import SideNavBar from './components/sideNav';
import NavBarComponent from './components/navbar';
import AdsModels from './components/ads-models';

function App() {
  const [loading, setLoading] = useState(true);
  const {isSignedIn} = useSelector(state => state);
  const dispatch = useDispatch();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // !! for conferting the object to boolean
      setIsSignedIn(dispatch, !!user);
      setTimeout(() => setLoading(false), 1000)
      ;
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);

  if(loading){
    return(
      <LoadingComponent/>
    )
  }
  return (
    <BrowserRouter>
      <NavBarComponent/>
      <Routes>
        <Route path="/" element={isSignedIn?<AdsModels/>:<Navigate to="/login"/>} />
        <Route path="/login" 
          element={!isSignedIn?<Login/>:<Navigate to="/"/>} 
        />
        <Route path="*" element={isSignedIn?<Navigate to="/"/>:<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
