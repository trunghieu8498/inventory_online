import { GET_WAREHOUSES, GET_WAREHOUSE_BY_ID, ADD_WAREHOUSE, SELECT_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID, UPDATE_WAREHOUSE, DELETE_WAREHOUSE } from '../constant'

const initialState = {
    warehouses: [], //warehouses of customer
    warehouse: null,
    warehouse_selected_id: null, //id warehouse selecting
    warehouse_selected: null,
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
        case SELECT_WAREHOUSE:
            localStorage.setItem('warehouse_selected_id', action.payload)
            return {
                ...state,
                warehouse_selected_id: action.payload
            }
        case ADD_WAREHOUSE:
            return {
                ...state,
                warehouses: [...state.warehouses, action.payload]
            }
        case UPDATE_WAREHOUSE:
            return{
                ...state,
                warehouses: action.payload
            }
        case DELETE_WAREHOUSE:
            return{
                ...state,
                warehouses: action.payload
            }
        default:
            return state
    }
}