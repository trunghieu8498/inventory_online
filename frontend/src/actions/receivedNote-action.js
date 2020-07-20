import axios from 'axios'
import { ADD_RECEIVED_NOTE_DETAIL, ADD_RECEIVED_NOTE, GET_RECEIVED_NOTES_BY_WAREHOUSE_ID } from '../constant'

export const addReceivedNote = (date, warehouse_id, receivedNoteDetails) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ date, warehouse_id, receivedNoteDetails })
    axios.post(`http://localhost:8000/api/receivednote/add`, body, config)
        .then(res => {
            dispatch({
                type: ADD_RECEIVED_NOTE,
                // payload: receivedNoteDetail
            })
            alert('Thêm phiếu nhập thành công!')
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

export const getReceivedNotesByWarehouse_id = (warehouse_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ })
    axios.get(`http://localhost:8000/api/receivednotes/get/${warehouse_id}`, body, config)
        .then(res => {
            dispatch({
                type: GET_RECEIVED_NOTES_BY_WAREHOUSE_ID,
                payload: res.data
            })
        })
        .catch((err) => {
            
            alert(err)
        })
}