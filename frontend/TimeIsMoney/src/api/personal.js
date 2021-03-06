import axios from 'axios'
import service from './../util/service.js'
/**
 * Get the personal informatin by userid
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getPersonalInfo() {
    let response = await service.get('/user') //!!!这里要改动 axios实例名为service
    ////(response)
    return response.data
}

export async function setPersonalInfo(data) {
    //("setthe Info :" + JSON.stringify(data))
    let response = await service.put('/user', data)
    return response.data
}


//get the list of the publishing tasks by cookies
export async function getPublishing() {
    let response = await service.get('/user/publish/all')
    return response.data
}


/**
 * Get the list of the attending tasks by cookies
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAttending() {
    let response = await service.get('/user/fill/all')
    return response.data
}

/**
 * Get the list of the starring questionnaire by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getStarring() {
    let response = await service.get('user/collect/all')
    return response.data
}

export async function getDetail(id) {
    let response = await service.get('/questionnaires/' + id)
    // //(JSON.stringify(response))
    return response.data
}


/**
 * Get the list of the alert information
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAlerts(id) {
    // let response = await axios.get('/', id)
    // return response.data
    let response = await service.get('/notifications/all')
    return response.data
}

/**
 * Set the status of the alert default
 * @param {int} id the id of the alert
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function changeAlertStatusById(data) {
    let response = service.put('/notifications', data)
    return response.data
}

/**
 * Set the status of the alert default
 * @param {int} id the id of the alert
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function changeAllAlertStatus() {
    let response = service.put('/notifications/all/' + true)
    return response.data
}


/**
 * Delete all the alerts by userid
 * @param {int} id the target user's id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function deleteAlertById(data) {
    let response = await service.delete('/notifications', { data: data })
    return response.data
}

/**
 * Delete all the alerts by userid
 * @param {int} id the target user's id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

export async function deleteAllAlerts() {
    let response = await service.delete('/notifications/all')
    return response.data
}


/**
 * get all the log of the user's deals 
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

export async function getAllDeals() {
    let response = await service.get('/user/asset/all')
    //(response.msg)
    return response.data
}


/**
 * recharge your account
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function rechargeAsset(paymentAbout) {
    let response = await service.post('/money', paymentAbout)
    ////(response.data)
    return response
}

/**
 * get all the log of the user's deals 
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

export async function withdrawAsset(paymentAbout) {
    let response = await service.post('/money', paymentAbout)
    ////(response.data)
    return response
}