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

/**
 * Get the list of the alert information
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAlerts (id) {
    // let response = await axios.get('/', id)
    // return response.data
    let data = [{
        time:'2019.2.3',
        title: 'aaaaa',
        content: 'fdsafdsafdsafd',
        status: 'error',
        type: 1
    },
    {
        time:'2019.2.3',
        title: 'aaaaa',
        content: 'fdsafdsafdsafd',
        status: 'error',
        type: 1
    }]
    return data
}