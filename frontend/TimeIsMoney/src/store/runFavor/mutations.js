export const SET_ERRANDLIST = 'SET_ERRANDLIST'
export const SET_DETAIL = 'SET_DETAIL'

export default{
    [SET_ERRANDLIST] (state, list) {
        state.errandList = list
    },
    [SET_DETAIL](state, data){
        state.errandDetail = data
    }
}