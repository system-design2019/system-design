import * as mutations from './mutations'
import * as errandAPI from './../../api/errands.js'

export const GET_ERRANDLIST = 'GET_ERRANDLIST'
export const CREATE_FAVOR = 'CREATE_FAVOR'
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
    errandAPI.createErrand(data).then((info) => {
        return info.success
          // commit(mutations.SET_ERRANDLIST, info.data)
      }
    ) 
  },

}


