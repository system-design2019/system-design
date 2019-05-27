import * as mutations from './mutations'
import * as quesAPI from './../../api/question.js'

export const GET_QUESLIST = 'GET_QUESLIST'
export const GET_COLLECT_QUESLIST = 'GET_COLLECT_QUESLIST'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_QUES = 'CREATE_QUES'
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
  [GET_DETAIL] ({commit}, id) {
    // console.log('123456789')
    quesAPI.getDetail(id).then((info)=>{
      commit(mutations.SET_DETAIL, info.data)
    })
    // console.log(data)
  },
  [CREATE_QUES] ({commit}, data) {
    quesAPI.createQues(data).then((info)=>{
      commit(mutations.SET_DETAIL, info)
    })
  }

}