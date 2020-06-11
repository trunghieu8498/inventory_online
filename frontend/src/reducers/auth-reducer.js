import { LOGIN_BY_CUSTOMER, SIGNUP } from '../constant'

const initialState = {
    customer_logged: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_BY_CUSTOMER:
            return {
                ...state,
                customer_logged: action.payload
            }
        case SIGNUP:
            return {
                ...state,
                customer_logged: action.payload
            }
        
        default:
            return state
    }
}