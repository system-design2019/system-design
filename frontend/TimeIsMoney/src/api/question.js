import axios from 'axios'
import service from './../util/service.js'
/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getQuesList () {
    let response = await service.get('/questionnaires/proceed/all')
    console.log(JSON.stringify(response.data))
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getCollectQuesList () {
    let response = await service.get('/questionnaires/collect/all')
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getAttendQuesList () {
    let response = await service.get('/questionnaires/fill/all')
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getPublishQuesList () {
    let response = await service.get('/questionnaires/publish/all')
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function collectQues (id) {
    let response = await service.put('questionnaires/'+id+'/collect')
    return response.data
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function cancelCollectQues (id) {
    let response = await service.delete('questionnaires/'+id+'/collect')
    return response.data
}


/**
 * Get the content of the questionnaire by id
 * @param {int} id  id of the target questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getQuesContent(id){
    let response = await service.get('/questionnaires/content/'+id)
    let data = {
        success: response.data.success,
        msg: response.data.msg,
        formContent:{
            quesID: response.data.data.quesID,
            title:response.data.data.title,
            number: response.data.data.number,
            questions:[]
        }
    }
    data.formContent.questions = response.data.data.ques1.concat(response.data.data.ques2)
    data.formContent.questions.sort(sortByThrorder);
    return data
}

function sortByThrorder(a,b){
    return a.theorder-b.theorder;
};


/**
 * Get the detail of the questionnaire
 * @param {int}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
export async function getDetail (id) {
    let response = await service.get('/questionnaires/'+id)
    // console.log(JSON.stringify(response))
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
    let response = await service.post('/getQues/'+String(quesid), answer)
    // console.log('response:'+JSON.stringify(response))
    return response.data
}

/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
export async function createQues (data) {
    console.log("创建问卷："+JSON.stringify(data))
    let response = await service.post('/questionnaires/publish', data)
    return response.data
}