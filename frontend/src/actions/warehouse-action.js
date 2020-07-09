import axios from 'axios'
import { ADD_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID, SELECT_WAREHOUSE } from "../constant"

export const loadWarehouse_selected_id = () => dispatch => {
    const local_warehouse_selected_id = localStorage.getItem('warehouse_selected_id') //JSON.Parse -> ko xai
    if (local_warehouse_selected_id !== null) {
        console.log('loaded local warehouse selected ! id = ', local_warehouse_selected_id)
        dispatch({
            type: SELECT_WAREHOUSE,
            payload: local_warehouse_selected_id
        })
    }
}

export const selectWarehouse = (warehouse_id) => dispatch => {
    // console.log(warehouse_id)
    dispatch({
        type: SELECT_WAREHOUSE,
        payload: warehouse_id
    })
}

export const addWarehouse = (warehouseName, address, description, customer_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ warehouseName, address, description, customer_id })
    console.log(body)
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
            alert(err)
        })
}

export const getWarehousesByCustomer_id = (customer_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (customer_id !== '')
        try {
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
                    alert('Lỗi lấy danh sách kho', err)
                })
        }
        catch (err) {
            console.log(err)
        }
}