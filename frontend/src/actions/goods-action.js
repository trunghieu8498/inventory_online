import axios from 'axios'
import { ADD_GOODS, GET_GOODSS_BY_WAREHOUSE_ID } from "../constant"

export const addGoods = (goodsName, weight, inventoryNumber, description, costPrice, sellingPrice, warehouse_id, type_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ goodsName, weight, inventoryNumber, description, costPrice, sellingPrice, warehouse_id, type_id })
    // console.log(body)
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

export const getGoodsByWarehouse_id = (warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (warehouse_id !== '')
        axios.get(`http://localhost:8000/api/goods/get/${warehouse_id}`, config)
            .then(res => {
                dispatch({
                    type: GET_GOODSS_BY_WAREHOUSE_ID,
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
    else
        alert('Hãy chọn kho trước khi xem')
}