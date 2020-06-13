import { combineReducers } from 'redux'

import customerReducer from './customer-reducer'
import authReducer from './auth-reducer'
import warehouseReducer from './warehouse-reducer'

export default combineReducers({
    customerReducer: customerReducer,
    authReducer: authReducer,
    warehouseReducer: warehouseReducer
})