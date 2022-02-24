import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import reduxThunk from 'redux-thunk';

// this line to use redux chrome extension 
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__

// applyMiddleware for enable using dispatch in actions
const store = createStore(reducer, enhancer(applyMiddleware(reduxThunk)));
export default store;

