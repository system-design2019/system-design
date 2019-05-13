import axios from 'axios'

/**
 * Get the personal informatin by userid
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getPersonalInfo (id) {
    let response = await axios.get('/allques', id)
    return response.data
}

/**
 * Get the list of the attending tasks by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAttending (id) {
    let response = await axios.get('/allques', id)
    return response.data
}

/**
 * Get the list of the starring questionnaire by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getStarring (id) {
    let response = await axios.get('/allques', id)
    return response.data
}