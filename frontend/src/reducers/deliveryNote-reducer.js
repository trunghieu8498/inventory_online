import { ADD_DELIVERY_NOTE_DETAIL, ADD_DELIVERY_NOTE, GET_DELIVERY_NOTES_BY_WAREHOUSE_ID, GET_DELIVERY_NOTE_DETAIL_BY_DELIVERY_NOTE_ID, RESET_DELIVERY_NOTE_DETAIL_TABLE } from '../constant'

const initialState = {
    deliveryNoteDetails: [],
    deliveryNotes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_DELIVERY_NOTE_DETAIL:
            return {
                ...state,
                // deliveryNoteDetails: [...state.deliveryNoteDetails, action.payload]
                deliveryNoteDetails: action.payload
            }
        case ADD_DELIVERY_NOTE:
            return {
                ...state,
            }
        case GET_DELIVERY_NOTES_BY_WAREHOUSE_ID:
            return {
                ...state,
                deliveryNotes: action.payload
            }
        case GET_DELIVERY_NOTE_DETAIL_BY_DELIVERY_NOTE_ID:
            return {
                ...state,
                deliveryNoteDetails: action.payload
            }
        case RESET_DELIVERY_NOTE_DETAIL_TABLE:
            return {
                ...state,
                deliveryNoteDetails: []
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