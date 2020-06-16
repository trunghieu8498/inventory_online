import { combineReducers } from 'redux'

import customerReducer from './customer-reducer'
import authReducer from './auth-reducer'
import warehouseReducer from './warehouse-reducer'
import typeReducer from './type-reducer'

export default combineReducers({
    customerReducer: customerReducer,
    authReducer: authReducer,
    warehouseReducer: warehouseReducer,
    typeReducer: typeReducer
})