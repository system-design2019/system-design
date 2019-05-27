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
    console.log(response)
    return response.data
}

/**
 * Get the list of the attending tasks by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAttending(id) {
    let response = await service.get('/allques', id)
    return response.data
}

/**
 * Get the list of the starring questionnaire by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getStarring(id) {
    let response = await service.get('/allques', id)
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