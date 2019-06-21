import * as mutations from './mutations'
import * as errandAPI from './../../api/errands.js'

export const GET_ERRANDLIST = 'GET_ERRANDLIST'
export const GET_ATTEND_LIST = 'GET_ATTEND_LIST'
export const CREATE_FAVOR = 'CREATE_FAVOR'
export const ATTEND_ERRAND = 'ATTEND_ERRAND'
export const CLOSE_ERRAND = 'CLOSE_ERRAND'
export const DELETE_ERRAND = 'DELETE_ERRAND'
// export const GET_RANKLIST = 'GET_RANKLIST'

export default {

  [GET_ERRANDLIST] ({commit}) {
    errandAPI.getErrandList().then((info) => {
        if(info.success)
          commit(mutations.SET_ERRANDLIST, info.data)
      }
    ) 
  },
  [CREATE_FAVOR] ({commit}, data) {
    return errandAPI.createErrand(data).then((info) => {
        return info.success
          // commit(mutations.SET_ERRANDLIST, info.data)
      }
    ) 
  },
  [GET_ATTEND_LIST]({commit}, id){
    errandAPI.getAttendUserList(id).then((info) => {
      if(info.success)
        commit(mutations.SET_ATTEND_LIST, info.data)
    }
  )},
  [ATTEND_ERRAND]({commit}, data){
    return errandAPI.attendErrand(data.eid, data.uid).then((info) => {
      // console.log('aaa')
      return info.success
    })
  },
  [CLOSE_ERRAND]({commit}, data){
    errandAPI.closeErrand(data.id)
  },
  [DELETE_ERRAND]({commit}, data){
    // errandAPI.deleteErrand(data.id)
  },
}


