import { LOGIN_AS_CUSTOMER, SIGNUP, LOGOUT, LOGIN_AS_ADMIN } from '../constant'

const initialState = {
    isAuthenticated: false,
    customer_logged: null, //object
    customer_id: '',//localStorage.getItem('customer_id')
    isAdmin: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_AS_CUSTOMER:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                isAuthenticated: true,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
            }
        case LOGIN_AS_ADMIN:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                isAuthenticated: true,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
                isAdmin: true
            }
        case SIGNUP:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                isAuthenticated: true,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
            }
        case LOGOUT:
            localStorage.setItem('customer_id', '')
            return {
                ...state,
                isAuthenticated: false,
                customer_id: '',
                customer_logged: null,
                isAdmin: false
            }

        default:
            return state
    }
}