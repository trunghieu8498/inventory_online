import axios from 'axios'
import { GET_RECEIVED_NOTE_DETAIL_BY_RECEIVED_NOTE_ID } from "../constant"

export const getReceivedNoteDetailByReceivedNoteId = (receivedNoteId) => dispatch => {
    return new Promise((resolve, reject)=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ })
        console.log('receivednote_id ',receivedNoteId)
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