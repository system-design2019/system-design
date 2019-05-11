import axios from 'axios'
import qs from 'qs'


/**
 * Login with a post to login url with the data {username, password}.
 * @param {string} username The username of the user.
 * Should be phone or email judged by frontend
 * @param {string} password The password of the user.
 * @return {Promise}
 * Promise will return the json data with success and message 
 */
export async function login (username, password) {
    let data = {
        "email": username,
        "password": password
    }
    axios.post('/user', JSON.stringify(data))
        .then((response)=>{
            console.log('response:'+response.data['msg'])
        })
        .catch((error)=>{
            console.log('error啊啊啊:'+ error)
        })
}


/**
 * Reserved API for new user's registration.
 * Register with a post to register url with the data {username, password}.
 * @param {string} username The username of new user.
 * Should be email or phone judged by frontend
 * @param {string} password The password of new user.
 * @return {Promise}
 * Promise will return the json data with success and message
 */
export async function userRegister (username, password) {
    let data = {
        email: username,
        password: password
    }
    axios.post('/register_form', data)
        .then((response)=>{
            console.log('response:'+response.data['msg'])
        })
        .catch((error)=>{
            console.log('error:'+ error)
        })
}
 