import { ADD_RECEIVED_NOTE_DETAIL, ADD_RECEIVED_NOTE, GET_RECEIVED_NOTES_BY_WAREHOUSE_ID, GET_RECEIVED_NOTE_DETAIL_BY_RECEIVED_NOTE_ID } from '../constant'

const initialState = {
    receivedNoteDetails: [], //array of 
    receivedNotes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_RECEIVED_NOTE_DETAIL:
            return {
                ...state,
                receivedNoteDetails: [...state.receivedNoteDetails, action.payload]
            }
        case ADD_RECEIVED_NOTE:
            return {
                ...state,
            }
        case GET_RECEIVED_NOTES_BY_WAREHOUSE_ID:
            return {
                ...state,
                receivedNotes: action.payload
            }
        case GET_RECEIVED_NOTE_DETAIL_BY_RECEIVED_NOTE_ID:
            return{
                ...state,
                receivedNoteDetails: action.payload
            }
        default:
            return state
    }
}

// const receivedNoteDetailExists = (newReceivedNoteDetail, receivedNoteDetails) => {
    // const index = this.props.receivedNoteDetails.findIndex(x => x.receivedNoteDetail_id === newReceivedNoteDetail)
    // if (index !== -1)
    //     return index
    // else {
    //     console.log('khong tim thay id ' + warehouse_selected_id + ' trong ds warehouse_id, reset index=0')
    //     localStorage.setItem('warehouse_selected_id', warehouses[0].warehouse_id)
    //     return 0
    // }
// }