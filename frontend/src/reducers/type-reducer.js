import { GET_TYPES, GET_TYPES_BY_WAREHOUSE_ID, ADD_TYPE, SELECT_TYPE_ID, UPDATE_TYPE, DELETE_TYPE } from "../constant"

const initialState = {
    types: [],
    type: null,
    type_selected_id: null
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
        case SELECT_TYPE_ID:
            return {
                ...state,
                type_selected_id: action.payload
            }
        case UPDATE_TYPE:
            return {
                ...state,
            }
        case DELETE_TYPE:
            return {
                ...state,
            }
        default:
            return state
    }
}