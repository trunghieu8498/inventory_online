import axios from 'axios'
import { ADD_DELIVERY_NOTE_DETAIL, ADD_DELIVERY_NOTE, GET_DELIVERY_NOTES_BY_WAREHOUSE_ID } from '../constant'

export const addDeliveryNote = (date, warehouse_id, deliveryNoteDetails) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ date, warehouse_id, deliveryNoteDetails })
    console.log(deliveryNoteDetails)
    axios.post(`http://localhost:8000/api/deliverynote/add`, body, config)
        .then(res => {
            dispatch({
                type: ADD_DELIVERY_NOTE,
                // payload: deliveryNoteDetail
            })
            alert('Thêm phiếu xuất thành công!')
            console.log('da them', res.data)
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err)
        })
}

export const getDeliveryNotesByWarehouse_id = (warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({})
    axios.get(`http://localhost:8000/api/deliverynotes/get/${warehouse_id}`, body, config)
        .then(res => {
            dispatch({
                type: GET_DELIVERY_NOTES_BY_WAREHOUSE_ID,
                payload: res.data
            })
        })
        .catch((err) => {

            alert(err)
        })
}