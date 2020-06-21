import { LOGIN_BY_CUSTOMER, SIGNUP, LOGOUT } from '../constant'

const initialState = {
    isAuthenticated: false,
    customer_logged: null, //object
    customer_id: ''//localStorage.getItem('customer_id')
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_BY_CUSTOMER:
            localStorage.setItem('customer_id', action.payload.customer_id)
            return {
                ...state,
                isAuthenticated: true,
                customer_id: action.payload.customer_id,
                customer_logged: action.payload,
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
                customer_logged: null
            }

        default:
            return state
    }
}