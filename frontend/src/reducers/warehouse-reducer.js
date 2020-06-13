import { GET_WAREHOUSES, GET_WAREHOUSE_BY_ID, ADD_WAREHOUSE, ACCESS_WAREHOUSE } from '../constant'

const initialState = {
    warehouses: [],
    warehouse: null,
    warehouse_accessed: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WAREHOUSES:
            return {
                ...state,
                warehouses: [...action.payload]
            }
        case GET_WAREHOUSE_BY_ID:
            return {
                ...state,
                warehouse: action.payload
            }
        case ADD_WAREHOUSE:
            return {
                ...state,
            }
        case ACCESS_WAREHOUSE:
            return {
                ...state,
                warehouse_accessed: action.payload
            }
        default:
            return state
    }
}