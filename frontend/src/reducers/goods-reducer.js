import { ADD_GOODS, GET_GOODSS_BY_WAREHOUSE_ID } from '../constant'

const initialState = {
    goodss: [],
    goods: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GOODSS_BY_WAREHOUSE_ID:
            return {
                ...state,
                goodss: action.payload
            }
        case ADD_GOODS:
            return {
                ...state
            }
        default:
            return state
    }
}