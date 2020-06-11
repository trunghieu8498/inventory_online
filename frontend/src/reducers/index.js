import { combineReducers } from 'redux'

import customerReducer from './customer-reducer'
import authReducer from './auth-reducer'
//import BillReducer from './billReducer'

export default combineReducers({
    customerReducer: customerReducer,
    authReducer: authReducer
})