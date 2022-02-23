import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import {addModel, setIsSignedIn} from './redux/actions'
import LoadingComponent from './components/react-loading';
import NavBarComponent from './components/navbar';
import AdsModels from './components/ads-models';
import ListModels from './components/list-models';
import CreateModel from './components/create-model';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const {isSignedIn, adsModels} = useSelector(state => state);
  const dispatch = useDispatch();

  const fetchApi = async() => {
    try {
      setFetching(true);
      const response = await fetch("/api");
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // eslint-disable-next-line array-callback-return
      await data.map((model) => {
        model = { ...model, id: uuidv4() };
        addModel(dispatch, model);
      })
      setFetching(false)
    } catch (error) {
      console.log('Looks like there was a problem: ', error);
    }
  }
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    fetchApi()
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // !! for conferting the object to boolean
      setIsSignedIn(dispatch, !!user);
      setLoading(false)      
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if(loading || fetching){
    return(
      <LoadingComponent/>
    )
  }
  return (
    <BrowserRouter>
      <NavBarComponent/>
      <Routes>
        <Route path="/" element={isSignedIn?<AdsModels/>:<Navigate to="/login"/>} />
        <Route path="/models" element={<ListModels/>} />
        <Route path="/create" element={<CreateModel/>} >
          <Route path=":id" element={<CreateModel/>} />
        </Route>
        <Route path="/login" 
          element={!isSignedIn?<Login/>:<Navigate to="/"/>} 
        />
        <Route path="*" element={isSignedIn?<Navigate to="/"/>:<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
