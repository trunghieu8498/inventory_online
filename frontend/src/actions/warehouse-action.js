import axios from 'axios'
import { ADD_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID } from "../constant"

export const addWarehouse = (warehouseName, address, description, customer_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ warehouseName, address, description, customer_id })
    axios.post('http://localhost:8000/api/warehouse/add', body, config)
        .then(res => {
            if (res.data) {
                dispatch({
                    type: ADD_WAREHOUSE,
                    payload: res.data
                })
            }
            alert('Đã thêm kho mới')
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err.res.data.msg)
        })
}

export const getWarehousesByCustomer_id = (customer_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get(`http://localhost:8000/api/warehouse/get/${customer_id}`, config)
        .then(res => {
            dispatch({
                type: GET_WAREHOUSES_BY_CUSTOMER_ID,
                payload: res.data
            })
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(customer_id)
        })
}