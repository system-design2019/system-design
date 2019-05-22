import axios from 'axios'

/**
 * Get the personal informatin by userid
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getPersonalInfo(id) {
    let response = await axios.get('/user')
    return response.data
}

/**
 * Get the list of the attending tasks by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAttending(id) {
    let response = await axios.get('/allques', id)
    return response.data
}

/**
 * Get the list of the starring questionnaire by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getStarring(id) {
    let response = await axios.get('/allques', id)
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
    let data = [{
            time: '2019.2.3',
            title: 'aaaaa',
            content: 'fdsafdsafdsafd',
            status: 'error',
            type: 1
        },
        {
            time: '2019.2.3',
            title: 'aaaaa',
            content: 'fdsafdsafdsafd',
            status: 'error',
            type: 1
        }
    ]
    return data
}

/**
 * Set the status of the alert default
 * @param {int} id the id of the alert
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function changeAlertStatusById(id) {
    let response = axios.post('/', id)
    return response.data
    return data
}

/**
 * Delete all the alerts by userid
 * @param {int} id the target user's id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function deleteAllAlerts(id) {
    let response = await axios.delete('/', id)
    return response.data
}