import axios from 'axios'
import { ADD_GOODS, GET_GOODSS_BY_WAREHOUSE_ID, SELECT_GOODS, UPDATE_GOODS, DELETE_GOODS, GET_GOODSS_AS_ADMIN } from "../constant"
import { setIsLoading, setIsLoaded } from './load-action'

export const selectGoods = (goods_selected_id) => dispatch => {
    dispatch({
        type: SELECT_GOODS,
        payload: goods_selected_id
    })
}

export const addGoods = (goodsName, weight, inventoryNumber, description, costPrice, sellingPrice, warehouse_id, type_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ goodsName, weight, inventoryNumber, description, costPrice, sellingPrice, warehouse_id, type_id })
    axios.post('http://localhost:8000/api/goods/add', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ADD_GOODS,
                payload: res.data
            })
            alert('Đã thêm hàng mới')
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err.res.data)
        })
}

export const getGoodsByWarehouse_id = (warehouse_id, isAdmin) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ isAdmin })
    if (warehouse_id !== '')
        axios.post(`http://localhost:8000/api/goods/get/${warehouse_id}`, body, config)
            .then(res => {
                dispatch({
                    type: GET_GOODSS_BY_WAREHOUSE_ID,
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

export const updateGoods = (goods_id, goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id })
    axios.put(`http://localhost:8000/api/goods/update/${goods_id}`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_GOODS,
                payload: res.data
            })
            alert('Đã sửa món hàng')
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            alert(err.res.data)
            dispatch(setIsLoaded())
        })
}

export const deleteGoods = (goods_id) => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({})
    axios.put(`http://localhost:8000/api/goods/delete/${goods_id}`, body, config)
        .then(res => {
            dispatch({
                type: DELETE_GOODS,
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

export const getGoodsAsAdmin = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post(`http://localhost:8000/api/goods/get/all`, null, config)
        .then(res => {
            dispatch({
                type: GET_GOODSS_AS_ADMIN,
                payload: res.data
            })
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            console.log('Lỗi lấy danh sách hàng (admin)', err)
            dispatch(setIsLoaded())
        })
}
