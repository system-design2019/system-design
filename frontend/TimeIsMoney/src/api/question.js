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
 * Get the content of the questionnaire by id
 * @param {int} id  id of the target questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getQuesContent(id){
    // let response = await axios.get('/', id)
    // return response.data
    let data = {
        success: true,
        msg: 'yes',
        data:{
            formContent:{
                title:'aaaaaaaa',
                number: 2,
                questions:[
                    {mode: 1, title:'试试', fill:false},
                    {mode: 2, title:'试试', choose:1, choices:['选项1', '选项2'], fill:false}
                ]
            }
        }
    }
    return data.formContent
}

/**
 * Get the detail of the questionnaire
 * @param {int}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getDetail (id) {
    let response = await axios.get('/getQues/'+String(id))
    // console.log('response:'+JSON.stringify(response))
    return response.data
}

/**
 * Commit the content of the questionaire
 * @param {int}  id  id of questionnaire
 * @param {string}  answer  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function commitAns (userid, quesid, answer) {
    let response = await axios.post('/getQues/'+String(quesid), answer)
    // console.log('response:'+JSON.stringify(response))
    return response.data
}

/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
export async function createQues (data) {
    let response = await axios.post('/createques', data)
    // console.log('response:'+JSON.stringify(response))
    return response.data
}