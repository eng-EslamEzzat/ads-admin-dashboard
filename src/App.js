import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import {addModel, setIsSignedIn} from './redux/actions'
import LoadingComponent from './components/react-loading';
import NavBarComponent from './components/navbar';
import AdsModels from './components/ads-models';
import ListModels from './components/list-models';
import CreateModel from './components/create-model';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/compat/auth';
import './firebase-config';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const {isSignedIn} = useSelector(state => state);
  const dispatch = useDispatch();

  //async function to fetch the data
  const fetchApi = async() => {
    //using try catch to handle errors
    try {
      // enable fetching loading
      setFetching(true);
      const response = await fetch("/api");
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      // after geting data we will loob on each element to add a unique id using uuid
      // eslint-disable-next-line array-callback-return
      await data.map((model) => {
        model = { ...model, id: uuidv4() };
        addModel(dispatch, model);
      })
      // fetching is finshed so stop loading
      setFetching(false)
    }
    catch (error) {
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

  // if the app fetching data or firebase checks authentication app shows spinner
  if(loading || fetching){
    return(
      <LoadingComponent/>
    )
  }

  // if there is no leading then run the app
  return (
    // using react router dom to handle routing
    <BrowserRouter>
      {/* navbar will be Fixed on all tabs */}
      <NavBarComponent/>
      {/* check if user is signed in or not and return right routs */}
      {isSignedIn?
        // if user is signed in
        <Routes>
          {/* home route for home screan that views the ads screens cleary */}
          <Route path="/" element={<AdsModels/>} />
          {/* another view list-view*/}
          <Route path="/models" element={<ListModels/>} />
          {/* for creating a new model */}
          <Route path="/create" element={<CreateModel/>} >
            {/* for updating an existing model/ads screen */}
            <Route path=":id" element={<CreateModel/>} />
          </Route>
          {/* if the user entered another tab that we haven't so redirect him to home */}
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>:
          // if user is not signed in
          <Routes>
          <Route path="/login" 
            element={<Login/>} 
          />
          {/* if the user entered another tab that we haven't and not signed in so redirect him to login */}
          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
