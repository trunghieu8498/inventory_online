import axios from 'axios'
import { ADD_RECEIVED_NOTE_DETAIL } from '../constant'

export const addReceivedNote = (goods_id, costprice, quantity) => dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
    // const body = JSON.stringify({ goods_id, costprice, quantity })
    // axios.post(`http://localhost:8000/api/receivednote/add`, body, config)
    //     .then(res => {
    //         const receivedNoteDetail = {
    //             goods: res.data,
    //             quantity: 1,
    //             costprice: 0,
    //         }
    //         dispatch({
    //             type: ADD_RECEIVED_NOTE_DETAIL,
    //             payload: receivedNoteDetail
    //         })
    //         // alert('Đã thêm hàng mới')
    //         console.log('da them')
    //     })
    //     .catch((err) => {
    //         // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
    //         // dispatch({
    //         //     type: LOGIN_FAIL
    //         // })
    //         alert(err)
    //     })
}

export const addReceivedNoteDetailToTable = (goods_id) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ goods_id })
    axios.get(`http://localhost:8000/api/goods/${goods_id}`, body, config)
        .then(res => {
            const receivedNoteDetail = {
                goods: res.data,
                quantity: 1,
                costprice: 0,
            }
            dispatch({
                type: ADD_RECEIVED_NOTE_DETAIL,
                payload: receivedNoteDetail
            })
            // alert('Đã thêm hàng mới')
            console.log('da them')
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err)
        })
}