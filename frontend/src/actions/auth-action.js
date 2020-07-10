import axios from 'axios'
import { LOGIN_BY_CUSTOMER, SIGNUP, LOGOUT } from '../constant'

export const loadCustomer = () => (dispatch, getState) => {
    const customer_id = localStorage.getItem('customer_id')//getState().authReducer.customer_id

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        axios.get(`http://localhost:8000/api/customer/${customer_id}`, config)
            .then(res => {
                dispatch({
                    type: LOGIN_BY_CUSTOMER,
                    payload: res.data
                })
                // console.log(res.data)
            })
            .catch(err => {
                console.log('loi load user do chua dang nhap');
                // // dispatch(returnErrors(err.response.data, err.response.status));
                // dispatch({
                //     type: AUTH_ERROR
                // })
            })
    }
    catch (err) {
        console.log(err)
    }
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

export const signup = (email, password, fullName, birthday, numberPhone) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log({ email, password, fullName, birthday, numberPhone })
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

export const logout = () => dispatch => {
    dispatch(
        {
            type: LOGOUT
        }
    )
}