import { ADD_GOODS, GET_GOODSS_BY_WAREHOUSE_ID, SELECT_GOODS, UPDATE_GOODS, DELETE_GOODS } from '../constant'

const initialState = {
    goodss: [],
    goods: null,
    goods_selected_id: null,
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
        case SELECT_GOODS:
            return {
                ...state,
                goods_selected_id: action.payload
            }
        case UPDATE_GOODS:
            return {
                ...state,
            }
        case DELETE_GOODS:
            return {
                ...state,
            }
        default:
            return state
    }
}