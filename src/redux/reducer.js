import { SETISSIGNIN } from './types'

const initState = {
    isSignedIn: true,
}

const counterReducer = (state = initState, action) => {
    switch (action.type) {
        case SETISSIGNIN:
            return {isSignedIn: action.flag}
        default:
            return state
    }
}

export default counterReducer