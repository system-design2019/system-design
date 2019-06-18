export const SET_QUESLIST = 'SET_QUESLIST'
export const SET_COLLECT_QUESLIST = 'SET_COLLECT_QUESLIST'
export const SET_ATTEND_QUESLIST = 'SET_ATTEND_QUESLIST'
export const SET_PUBLISH_QUESLIST = 'SET_PUBLISH_QUESLIST'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_LOCAL_COLLECTLIST = 'SET_LOCAL_COLLECTLIST'
export const DELETE_QUES_BY_INDEX = 'DELETE_QUES_BY_INDEX'
export default{
    [SET_QUESLIST] (state, list) {
        state.quesList = list
    },
    [SET_COLLECT_QUESLIST] (state, list) {
        state.collectQuesList = list
        // console.error(list)
    },
    [SET_PUBLISH_QUESLIST] (state, list) {
        state.publishQuesList = list
        // console.error(list)
    },
    [SET_ATTEND_QUESLIST] (state, list) {
        state.attendQuesList = list
        // console.error(list)
    },
    [SET_DETAIL] (state, detail){
        state.quesDetail = detail
    },
    [SET_LOCAL_COLLECTLIST] (state, id){
        let pos = state.collectQuesList.indexOf(id)
        if(pos != -1){
            state.collectQuesList.splice(pos, 1)
        }
        else{
            state.collectQuesList.push(id)
        }
    },
    [DELETE_QUES_BY_INDEX](state, index){
        state.quesList.splice(index, 1)
    },

}