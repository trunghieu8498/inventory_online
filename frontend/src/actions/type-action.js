import axios from 'axios'
import { ADD_TYPE, GET_TYPES_BY_WAREHOUSE_ID, SELECT_TYPE_ID, UPDATE_TYPE, DELETE_TYPE } from "../constant"
import { setIsLoading, setIsLoaded } from './load-action'


export const addType = (typeName, warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ typeName, warehouse_id })
    axios.post('http://localhost:8000/api/type/add', body, config)
        .then(res => {
            dispatch({
                type: ADD_TYPE,
                payload: res.data
            })
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
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (warehouse_id !== '')
        axios.get(`http://localhost:8000/api/type/get/${warehouse_id}`, config)
            .then(res => {
                dispatch({
                    type: GET_TYPES_BY_WAREHOUSE_ID,
                    payload: res.data
                })
                dispatch(setIsLoaded())
            })
            .catch((err) => {
                // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
                // dispatch({
                //     type: LOGIN_FAIL
                // })
                alert(err)
                dispatch(setIsLoaded())
            })
    else
        alert('Hãy chọn kho trước khi xem')
}

export const selectType_id = (type_id) => dispatch => {
    dispatch({
        type: SELECT_TYPE_ID,
        payload: type_id
    })
}

export const updateType = (type_id, typeName) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ typeName })
    axios.put(`http://localhost:8000/api/type/update/${type_id}`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_TYPE,
                payload: res.data
            })
            alert('Đã sửa loại hàng')
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            alert(err.res.data)
            dispatch(setIsLoaded())
        })
}

export const deleteType = (type_id) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({})
    axios.put(`http://localhost:8000/api/type/delete/${type_id}`, body, config)
        .then(res => {
            dispatch({
                type: DELETE_TYPE,
                payload: res.data
            })
            alert('Xóa thành công')
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            alert(err.res.data)
            dispatch(setIsLoaded())
        })
}
