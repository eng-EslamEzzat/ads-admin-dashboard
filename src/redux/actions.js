import {ADDMODEL, REMOVESMODEL, SETISSIGNIN, UPDATEMODEL} from "./types"

export const setIsSignedIn = (dispatch, flag) => dispatch(
    {
        type: SETISSIGNIN,
        flag,
    }
)

export const addModel = (dispatch, data) => dispatch(
    {
        type: ADDMODEL,
        data,
    }
)

export const updateModel = (dispatch, data) => dispatch(
    {
        type: UPDATEMODEL,
        data,
    }
)

export const removeModel = (dispatch, data) => dispatch(
    {
        type: REMOVESMODEL,
        data,
    }
)
