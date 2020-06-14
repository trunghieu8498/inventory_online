import { GET_WAREHOUSES, GET_WAREHOUSE_BY_ID, ADD_WAREHOUSE, ACCESS_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID } from '../constant'

const initialState = {
    warehouses: [], //warehouses of customer
    warehouse: null,
    warehouse_accessed_id: null, //id warehouse accessing
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
        case GET_WAREHOUSES_BY_CUSTOMER_ID:
            return {
                ...state,
                warehouses: action.payload
            }
        case ADD_WAREHOUSE:
            return {
                ...state,
            }
        case ACCESS_WAREHOUSE:
            return {
                ...state,
                warehouse_accessed_id: action.payload
            }
        default:
            return state
    }
}