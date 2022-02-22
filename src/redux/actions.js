import {SETISSIGNIN} from "./types"

export const setIsSignedIn = (dispatch, flag) => dispatch(
    {
        type: SETISSIGNIN,
        flag,
    }
)
