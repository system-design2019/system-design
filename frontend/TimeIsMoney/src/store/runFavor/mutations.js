export const SET_ERRANDLIST = 'SET_ERRANDLIST'
export const SET_ATTEND_LIST = 'SET_ATTEND_LIST'
export const SET_DETAIL = 'SET_DETAIL'
export const DELETE_FAVOR_BY_INDEX = 'DELETE_FAVOR_BY_INDEX'

export default{
    [SET_ERRANDLIST] (state, list) {
        state.errandList = list
    },
    [SET_DETAIL](state, data){
        state.errandDetail = data
    },
    [SET_ATTEND_LIST](state, data){
        state.attendErrandList = data
    }
}