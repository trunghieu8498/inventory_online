import axios from 'axios'
import { LOGIN_BY_CUSTOMER, SIGNUP } from '../constant'

export const login = (email, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    axios.post('http://localhost:8000/api/login', body, config)
        .then(res => {
            console.log(res.data)
            if (res.data) {
                dispatch({
                    type: LOGIN_BY_CUSTOMER,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
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
            // dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err.response.data.msg)
        })
}