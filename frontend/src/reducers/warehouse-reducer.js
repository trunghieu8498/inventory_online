import { GET_WAREHOUSES, GET_WAREHOUSE_BY_ID, ADD_WAREHOUSE, SELECT_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID } from '../constant'

const initialState = {
    warehouses: [], //warehouses of customer
    warehouse: null,
    warehouse_selected_id: '', //id warehouse selecting
    warehouse_selected: null
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
            console.log('GET_WAREHOUSES_BY_CUSTOMER_ID', action.payload)
            return {
                ...state,
                warehouses: action.payload
            }
        case ADD_WAREHOUSE:
            return {
                ...state,
            }
        case SELECT_WAREHOUSE:
            localStorage.setItem('warehouse_selected_id', action.payload)
            return {
                ...state,
                warehouse_selected_id: action.payload
            }
        default:
            return state
    }
}