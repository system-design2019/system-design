import axios from 'axios'
import service from './../util/service.js'
/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getErrandList () {
    let response = await service.get('/errands/proceed/all')
    // console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @param {Json} data
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function createErrand (data) {
    let response = await service.post('/errands/publish', data)
    // console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function closeErrand (data) {
    let response = await service.get('/closeErra/'+id)
    // console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function deleteErrand (data) {
    let response = await service.get('/deleteErra/'+id)
    // console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} erraid
 * @param {int} userid
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function attendErrand (eid, uid) {
    let response = await service.post('/participate/'+eid+'/'+uid)
    // console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} erraid
 * @param {int} userid
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function confirmErrand (eid, uid) {
    let response = await service.post('/confirm/'+eid+'/'+uid)
    // console.log(JSON.stringify(response.data))
    return response.data
}