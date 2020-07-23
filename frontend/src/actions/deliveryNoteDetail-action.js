import axios from 'axios'
import { GET_DELIVERY_NOTE_DETAIL_BY_DELIVERY_NOTE_ID, RESET_DELIVERY_NOTE_DETAIL_TABLE, ADD_DELIVERY_NOTE_DETAIL } from "../constant"

export const getDeliveryNoteDetailsByDeliveryNoteId = (deliveryNoteId) => dispatch => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({})
        console.log('deliverynote_id ', deliveryNoteId)
        axios.get(`http://localhost:8000/api/deliverynotedetail/get/${deliveryNoteId}`, body, config)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: GET_DELIVERY_NOTE_DETAIL_BY_DELIVERY_NOTE_ID,
                    payload: res.data
                })
                resolve(res.data)
            })
            .catch((err) => {

                alert(err)
            })
    })
}

export const addDeliveryNoteDetailToTable = (goods, deliveryNoteDetails) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { goods_id } = goods
    const deliveryNoteDetailExist = await deliveryNoteDetails.find(element => element.goods.goods_id === goods.goods_id)
    if (!deliveryNoteDetailExist)
        axios.get(`http://localhost:8000/api/goods/${goods_id}`, null, config)
            .then(res => {
                var newDeliveryNoteDetail = {
                    goods: res.data,
                    quantity: 1,
                    sellingrice: 0,
                }
                deliveryNoteDetails = [...deliveryNoteDetails, newDeliveryNoteDetail]
                dispatch({
                    type: ADD_DELIVERY_NOTE_DETAIL,
                    payload: deliveryNoteDetails
                })
                console.log('da them')
            })
            .catch((err) => {
                alert(err)
            })
    else {
        deliveryNoteDetails[deliveryNoteDetails.indexOf(deliveryNoteDetailExist)].quantity++
        console.log('quantity updated')
        dispatch({
            type: ADD_DELIVERY_NOTE_DETAIL,
            payload: [...deliveryNoteDetails]
        })
    }
}

const updateQuantity = (deliveryNoteDetail, deliveryNoteDetails) => dispatch => {
    deliveryNoteDetails.findIndexOf(deliveryNoteDetail)
}

export const resetDeliveryNoteTable = () => dispatch => {
    dispatch({
        type: RESET_DELIVERY_NOTE_DETAIL_TABLE
    })
}