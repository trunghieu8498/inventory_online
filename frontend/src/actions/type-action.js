import axios from 'axios'
import { ADD_TYPE, GET_TYPES_BY_WAREHOUSE_ID } from "../constant"

export const addType = (typename, warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ typename, warehouse_id })
    axios.post('http://localhost:8000/api/type/add', body, config)
        .then(res => {
            if (res.data) {
                dispatch({
                    type: ADD_TYPE,
                    payload: res.data
                })
            }
            alert('Đã thêm loại mới')
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err.res.data)
        })
}

export const getTypesByWarehouse_id = (warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get(`http://localhost:8000/api/type/get/${warehouse_id}`, config)
        .then(res => {
            dispatch({
                type: GET_TYPES_BY_WAREHOUSE_ID,
                payload: res.data
            })
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err)
        })
}