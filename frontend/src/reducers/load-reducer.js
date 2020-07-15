import { LOADING, LOADED } from "../constant"

const initialState = {
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}