export const SET_QUESLIST = 'SET_QUESLIST'
export const SET_DETAIL = 'SET_DETAIL'

export default{
    [SET_QUESLIST] (state, list) {
        state.quesList = list
    },
    [SET_DETAIL] (state, detail){
        // console.log(detail)
        console.log('detail!!!  '+JSON.stringify(detail))
        state.quesDetail = detail
        return true
    }
    
}