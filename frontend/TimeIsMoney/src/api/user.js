import axios from 'axios'
import service from './../util/service.js'
import qs from 'qs'


/**
 * Login with a post to login url with the data {username, password}.
 * @param {string} username The username of the user.
 * Should be phone or email judged by frontend
 * @param {string} password The password of the user.
 * @param {string} mode The mode of new user.
 * @return {Promise}
 * Promise will return the json data with success and message 
 */
export async function login(username, password, mode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone": username, "password": password }
    else
        data = { "email": username, "password": password }
    let response = await service.post('/login', data)

    // fetch("http://172.26.70.9:8080/login", {
    //     type:"cors",
    //     credentials:"include",
    //     method: "post",
    //     headers: {  
    //         "Content-Type": "application/json;charset=UTF-8"
    //       },
    //     body: JSON.stringify(data)
    // })
    // .then(response => {
    //     response.text().then(res => {
    //         //(res)
    //     })
    // })

    //('response:' + JSON.stringify(response))
    return response.data
}


/**
 * Reserved API for new user's registration.
 * Register with a post to register url with the data {username, password}.
 * @param {string} username The username of new user.
 * Should be email or phone judged by frontend
 * @param {string} password The password of new user.
 * @param {string} mode The mode of new user.
 * @return {Promise}
 * Promise will return the json data with success and message
 */
export async function userRegister(username, password, mode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone": username, "password": password }
    else
        data = { "email": username, "password": password }
    let response = await service.post('/register', data)
    //(response.data)
    return response.data
}


// use in sign in
export async function sendIndentify(username, mode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone_or_email": 0, "target": username, "type": 0 }
    else
        data = { "phone_or_email": 1, "target": username, "type": 0 }
    let response = await service.post('/code', data)
    //(response.data)
    return response.data
}

export async function checkIndentify(username, mode, inputCode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone_or_email": 0, "target": username, "code": inputCode } //code is string
    else
        data = { "phone_or_email": 1, "target": username, "code": inputCode }
    let response = await service.post('/code/verify', data)
    //(response.data)
    return response.data
}

// use in find pass 

export async function sendIndentify2(username, mode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone_or_email": 0, "target": username, "type": 1 }
    else
        data = { "phone_or_email": 1, "target": username, "type": 1 }
    let response = await service.post('/code', data)
    //(response.data)
    return response.data
}

export async function checkIndentify2(username, mode, inputCode) {
    let data = {}
    if (mode === 'phone')
        data = { "phone_or_email": 0, "target": username, "code": inputCode } //code is string
    else
        data = { "phone_or_email": 1, "target": username, "code": inputCode }
    let response = await service.post('/code/verify', data)
    //(response.data)
    return response.data
}