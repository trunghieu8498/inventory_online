import axios from 'axios'
import { LOGIN_BY_CUSTOMER, SIGNUP, LOGOUT } from '../constant'

export const loadCustomer = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const customer_id = localStorage.getItem('customer_id')//getState().authReducer.customer_id

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        axios.get(`http://localhost:8000/api/customer/${customer_id}`, config)
            .then(res => {
                dispatch({
                    type: LOGIN_BY_CUSTOMER,
                    payload: res.data
                })
                resolve(res.data)
            })
            .catch(err => {
                console.log('loi load user do chua dang nhap');
                reject(err)
            })
    })
}
    


export const login = (email, password) => dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password });
        console.log(body)
        axios.post('http://localhost:8000/api/login', body, config)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: LOGIN_BY_CUSTOMER,
                    payload: res.data
                })
            })
            .catch((err) => {
                // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
                // dispatch({
                //     type: LOGIN_FAIL
                // })
                alert(err.response.data.msg)
            })
    }

    export const signup = (email, password, fullname, birthday, numberphone) => dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log({ email, password, fullname, birthday, numberphone })
        const body = JSON.stringify({ email, password, fullname, birthday, numberphone });
        axios.post('http://localhost:8000/api/signup', body, config)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    dispatch({
                        type: SIGNUP,
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
                // dispatch({
                //     type: LOGIN_FAIL
                // })
                alert(err.res.data.msg)
            })
    }

    export const logout = () => dispatch => {
        dispatch(
            {
                type: LOGOUT
            }
        )
    }