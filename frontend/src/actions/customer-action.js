import axios from 'axios'
import { GET_CUSTOMERS_AS_ADMIN } from '../constant'
import { setIsLoading, setIsLoaded } from './load-action'

export const getCustomersAsAdmin = () => dispatch => {
    dispatch(setIsLoading())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post(`http://localhost:8000/api/customer/get/all`, null, config)
        .then(res => {
            dispatch({
                type: GET_CUSTOMERS_AS_ADMIN,
                payload: res.data
            })
            dispatch(setIsLoaded())
        })
        .catch((err) => {
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert('Loi get danh sach customer',err)
            dispatch(setIsLoaded())
        })
}