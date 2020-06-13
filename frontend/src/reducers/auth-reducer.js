import { LOGIN_BY_CUSTOMER, SIGNUP } from '../constant'

const initialState = {
    isAuthenticated: false,
    customer_logged: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_BY_CUSTOMER:
            return {
                ...state,
                customer_logged: action.payload,
                isAuthenticated: true
            }
        case SIGNUP:
            return {
                ...state,
                customer_logged: action.payload,
                isAuthenticated: true
            }

        default:
            return state
    }
}