import axios from 'axios'
import { GET_RECEIVED_NOTE_DETAIL_BY_RECEIVED_NOTE_ID, RESET_RECEIVED_NOTE_DETAIL_TABLE, ADD_RECEIVED_NOTE_DETAIL } from "../constant"

export const getReceivedNoteDetailsByReceivedNoteId = (receivedNoteId) => dispatch => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({})
        console.log('receivednote_id ', receivedNoteId)
        axios.get(`http://localhost:8000/api/receivednotedetail/get/${receivedNoteId}`, body, config)
            .then(res => {
                dispatch({
                    type: GET_RECEIVED_NOTE_DETAIL_BY_RECEIVED_NOTE_ID,
                    payload: res.data
                })
                resolve(res.data)
            })
            .catch((err) => {

                alert(err)
            })
    })
}

export const addReceivedNoteDetailToTable = (goods, receivedNoteDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { goods_id } = goods
    const receivedNoteDetailExist = await receivedNoteDetails.find(element => element.goods.goods_id === goods.goods_id)
    if (!receivedNoteDetailExist)
        axios.get(`http://localhost:8000/api/goods/${goods_id}`, null, config)
            .then(res => {
                var newReceivedNoteDetail = {
                    goods: res.data,
                    quantity: 1,
                    costprice: 0
                }
                receivedNoteDetails = [...receivedNoteDetails, newReceivedNoteDetail]
                dispatch({
                    type: ADD_RECEIVED_NOTE_DETAIL,
                    payload: receivedNoteDetails
                })
                console.log('da them')
            })
            .catch((err) => {
                alert(err)
            })
    else {
        receivedNoteDetails[receivedNoteDetails.indexOf(receivedNoteDetailExist)].quantity++
        console.log('quantity updated')
        dispatch({
            type: ADD_RECEIVED_NOTE_DETAIL,
            payload: [...receivedNoteDetails]
        })
    }
}

const updateQuantity = (receivedNoteDetail, receivedNoteDetails) => dispatch => {
    receivedNoteDetails.findIndexOf(receivedNoteDetail)
}

export const resetReceivedNoteTable = () => dispatch => {
    dispatch({
        type: RESET_RECEIVED_NOTE_DETAIL_TABLE
    })
}