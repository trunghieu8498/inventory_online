import axios from 'axios'
import { ADD_WAREHOUSE, GET_WAREHOUSES_BY_CUSTOMER_ID, SELECT_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE, GET_WAREHOUSES_AS_ADMIN } from "../constant"
import { setIsLoading, setIsLoaded } from './load-action'

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

export const addWarehouse = (warehousename, address, description, customer_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ warehousename, address, description, customer_id })
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
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (customer_id !== '')
        axios.get(`http://localhost:8000/api/warehouse/get/${customer_id}`, config)
            .then(res => {
                dispatch({
                    type: GET_WAREHOUSES_BY_CUSTOMER_ID,
                    payload: res.data
                })
                dispatch(setIsLoaded())
            })
            .catch((err) => {
                // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
                // dispatch({
                //     type: LOGIN_FAIL
                // })
                alert('Lỗi lấy danh sách kho', err)
                dispatch(setIsLoaded())
            })
    // else
    //     alert('customer_id is "" ')
}

export const updateWarehouse = (warehouse_id, warehousename, address, description) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ warehousename, address, description })
    axios.put(`http://localhost:8000/api/warehouse/update/${warehouse_id}`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_WAREHOUSE,
                payload: res.data
            })
            alert('Đã sửa kho hàng')
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            alert(err.res.data)
            dispatch(setIsLoaded())
        })
}

export const deleteWarehouse = (warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log('id ne` ', warehouse_id)
    const body = JSON.stringify({})
    axios.put(`http://localhost:8000/api/warehouse/delete/${warehouse_id}`, body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: DELETE_WAREHOUSE,
                payload: res.data
            })
            alert('Xóa thành công')
        })
        .catch((err) => {
            alert(err.res.data)
        })
}

export const getWarehouseAsAdmin = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post(`http://localhost:8000/api/warehouse/get/all`, null, config)
        .then(res => {
            dispatch({
                type: GET_WAREHOUSES_AS_ADMIN,
                payload: res.data
            })
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            alert('Lỗi lấy danh sách kho (admin)', err)
            dispatch(setIsLoaded())
        })
}