export const SET_QUESLIST = 'SET_QUESLIST'
export const SET_COLLECT_QUESLIST = 'SET_COLLECTA_QUESLIST'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_LOCAL_COLLECTLIST = 'SET_LOCAL_COLLECTLIST'

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
    },
    [SET_LOCAL_COLLECTLIST] (state, id){
        let pos = state.collectQuesList.indexOf(id)
        if(pos != -1){
            state.collectQuesList.splice(pos, 1)
        }
        else{
            state.collectQuesList.push(id)
        }
    }
}