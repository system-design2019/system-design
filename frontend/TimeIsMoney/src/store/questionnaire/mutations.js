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
        return true
    },
    [SET_COLLECT_QUESLIST] (state, list) {
        state.collectQuesList = list
        return true
        // console.error(list)
    },
    [SET_PUBLISH_QUESLIST] (state, list) {
        state.publishQuesList = list
        return true
        // console.error(list)
    },
    [SET_ATTEND_QUESLIST] (state, list) {
        state.attendQuesList = list
        return true
        // console.error(list)
    },
    [SET_DETAIL] (state, detail){
        state.quesDetail = detail
        return true
    },
    [SET_LOCAL_COLLECTLIST] (state, id){
        let pos = state.collectQuesList.indexOf(id)
        if(pos != -1){
            state.collectQuesList.splice(pos, 1)
        }
        else{
            state.collectQuesList.push(id)
        }
        return true
    },
    [DELETE_QUES_BY_INDEX](state, index){
        state.quesList.splice(index, 1)
        return true
    },

}