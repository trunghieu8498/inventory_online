import { ADD_RECEIVED_NOTE_DETAIL } from '../constant'

const initialState = {
    receivedNoteDetails: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_RECEIVED_NOTE_DETAIL:

            return {
                ...state,
                receivedNoteDetails: [...state.receivedNoteDetails, action.payload]
            }
        default:
            return state
    }
}

const receivedNoteDetailExists = (newReceivedNoteDetail, receivedNoteDetails) => {
    // const index = this.props.receivedNoteDetails.findIndex(x => x.receivedNoteDetail_id === newReceivedNoteDetail)
    // if (index !== -1)
    //     return index
    // else {
    //     console.log('khong tim thay id ' + warehouse_selected_id + ' trong ds warehouse_id, reset index=0')
    //     localStorage.setItem('warehouse_selected_id', warehouses[0].warehouse_id)
    //     return 0
    // }
}