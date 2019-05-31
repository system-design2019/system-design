import * as mutations from './mutations'
import * as quesAPI from './../../api/question.js'

export const GET_QUESLIST = 'GET_QUESLIST'
export const GET_COLLECT_QUESLIST = 'GET_COLLECT_QUESLIST'
export const GET_ATTEND_QUESLIST = 'GET_ATTEND_QUESLIST'
export const GET_PUBLISH_QUESLIST = 'GET_PUBLISH_QUESLIST'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_QUES = 'CREATE_QUES'
export const CHANGE_COLLECT = 'CHANGE_COLLECT'
// export const GET_RANKLIST = 'GET_RANKLIST'

export default {

  [GET_QUESLIST] ({commit}) {
    quesAPI.getQuesList().then((info) => {
        if(info.success)
          commit(mutations.SET_QUESLIST, info.data)
      }
    ) 
  },
  [GET_COLLECT_QUESLIST] ({commit}) {
    quesAPI.getCollectQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_COLLECT_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_ATTEND_QUESLIST] ({commit}) {
    quesAPI.getAttendQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_ATTEND_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_PUBLISH_QUESLIST] ({commit}) {
    quesAPI.getPublishQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_PUBLISH_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_DETAIL] ({commit}, id) {
    // console.log('123456789')
    quesAPI.getDetail(id).then((info)=>{
      commit(mutations.SET_DETAIL, info.data)
    })
    // console.log(data)
  },
  [CREATE_QUES] ({commit}, data) {
    let format = {
      "quesID":3338,
      "title":data.formContent.title,
      "detail":data.formValidate.detail,
      "publisher":7,
      "reward":data.formValidate.reward,
      "command":data.formValidate.command,
      "status":"not done",
      "number":data.formContent.number,
      "infos":{
        "total":data.formValidate.quantity,
        "attend":0,
        "startTime":data.formValidate.startdate+' '+data.formValidate.starttime,
        "endTime":data.formValidate.enddata+' '+data.formValidate.endtime
      },
      "tians":data.formContent.tians,
      "xuans":data.formContent.xuans
      }
    quesAPI.createQues(format).then((info)=>{
      
    })
  },
  [CHANGE_COLLECT]({state, commit}, id){
    if(state.collectQuesList.indexOf(id) != -1){
      quesAPI.cancelCollectQues(id).then((info)=>{
        commit(mutations.SET_LOCAL_COLLECTLIST, id)
      })
    }
    else{
      quesAPI.collectQues(id).then((info)=>{
        commit(mutations.SET_LOCAL_COLLECTLIST, id)
      })
    }
    
  }

}