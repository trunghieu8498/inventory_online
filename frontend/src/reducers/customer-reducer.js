import { GET_CUSTOMERS, GET_CUSTOMER_BY_ID, ADD_CUSTOMER, GET_CUSTOMERS_AS_ADMIN } from '../constant'

const initialState = {
    customers: [],
    customer: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: [...action.payload]
            }
        case GET_CUSTOMER_BY_ID:
            return {
                ...state,
                customer: action.payload
            }
        case ADD_CUSTOMER:
            return {
                ...state,
            }
        case GET_CUSTOMERS_AS_ADMIN:
            return {
                ...state,
                customers: action.payload
            }
        default:
            return state
    }
}