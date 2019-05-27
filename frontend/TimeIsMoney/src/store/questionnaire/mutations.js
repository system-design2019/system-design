export const SET_QUESLIST = 'SET_QUESLIST'
export const SET_COLLECT_QUESLIST = 'SET_COLLECTA_QUESLIST'
export const SET_DETAIL = 'SET_DETAIL'

export default{
    [SET_QUESLIST] (state, list) {
        state.quesList = list
    },
    [SET_COLLECT_QUESLIST] (state, list) {
        state.collectQuesList = list
        // console.error(list)
    },
    [SET_DETAIL] (state, detail){
        state.quesDetail = detail
    }
    
}