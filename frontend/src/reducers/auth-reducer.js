import { LOGIN_BY_CUSTOMER, SIGNUP } from '../constant'

const initialState = {
    isAuthenticated: false,
    customer_logged: null, //object
    customer_id: localStorage.getItem('customer_id')
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_BY_CUSTOMER:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
                isAuthenticated: true
            }
        case SIGNUP:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
                isAuthenticated: true
            }

        default:
            return state
    }
}