import { SETISSIGNIN, ADDMODEL, REMOVESMODEL } from './types'

const initState = {
    isSignedIn: true,
    adsModels: [],
}

const counterReducer = (state = initState, action) => {
    switch (action.type) {
        case SETISSIGNIN:
            return {...state, isSignedIn: action.flag}
        case ADDMODEL:
            return {...state, adsModels:[...state.adsModels, action.data]}
        case REMOVESMODEL:
            let models = [];
            models = state.adsModels.filter(model=> model.id !== action.data.id)
            return {...state, adsModels:models}
        default:
            return state
    }
}

export default counterReducer