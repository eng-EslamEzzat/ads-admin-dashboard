import { SETISSIGNIN, ADDMODEL, REMOVESMODEL, UPDATEMODEL } from './types'

// state initialization
const initState = {
    isSignedIn: true,
    adsModels: [],
}

// using switch to easily use reducers functions
const counterReducer = (state = initState, action) => {
    let models = [];
    switch (action.type) {
        case SETISSIGNIN:
            return {...state, isSignedIn: action.flag}
        case ADDMODEL:
            return {...state, adsModels:[...state.adsModels, action.data]}
        case REMOVESMODEL:
            models = state.adsModels.filter(model=> model.id !== action.data.id)
            return {...state, adsModels:models}
        case UPDATEMODEL:
            // loop on all models and on updated model return action data
            models = state.adsModels.map(model=>{
                if(model.id === action.data.id){
                    return action.data
                }
                return model
            })
            return {...state, adsModels:models}
        default:
            return state
    }
}

export default counterReducer