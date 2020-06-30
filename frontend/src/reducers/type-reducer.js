import { GET_TYPES, GET_TYPES_BY_WAREHOUSE_ID, ADD_TYPE } from "../constant"

const initialState = {
    types: [],
    type: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: [...action.payload]
            }
        case GET_TYPES_BY_WAREHOUSE_ID:
            return {
                ...state,
                types: action.payload
            }
        case ADD_TYPE:
            return {
                ...state,
                // type: action.payload
            }
        default:
            return state
    }
}