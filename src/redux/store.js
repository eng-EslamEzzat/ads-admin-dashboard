import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import reduxThunk from 'redux-thunk';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__

const store = createStore(reducer, enhancer(applyMiddleware(reduxThunk)));
export default store;

