import axios from 'axios'

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getQuesList () {
    let response = await axios.get('/allques')
    return response.data

}

/**
 * Get the detail of the questionnaire
 * @param {string}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getDetail (id) {
    let response = await axios.get('/getQues/'+String(id))
    console.log('response:'+JSON.stringify(response))
    return response.data
}

/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
export async function createQues (data) {
    let response = await axios.post('/createques', data)
    console.log('response:'+JSON.stringify(response))
    return response.data
}