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
            // dispatch(returnErrors(err.res.data, err.res.status, 'LOGIN_FAIL'))
            // dispatch({
            //     type: LOGIN_FAIL
            // })
            alert(err.res.data)
        })
}

export const signup = (email, password, fullName, birthday, numberPhone) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password, fullName, birthday, numberPhone });
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