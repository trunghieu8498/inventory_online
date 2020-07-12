import { LOADING, LOADED } from "../constant"

export const setIsLoading = () => dispatch => {
    dispatch({
        type: LOADING
    })
}

export const setIsLoaded = () => dispatch => {
    dispatch({
        type: LOADED
    })
}