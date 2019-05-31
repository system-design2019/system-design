import Vue from 'vue'
export const SET_PER_INFO = 'SET_PER_INFO'
export const SET_PUBLISHING = 'SET_PUBLISHING'
export const SET_ATTENDING = 'SET_ATTENDING'
export const SET_STARRING = 'SET_STARRING'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_RECEIVE = 'SET_RECEIVE'
export const CHANGE_LOCAL_STATUS = 'CHANGE_LOCAL_STATUS'
export const DELETE_LOCAL_ALERT = 'DELETE_LOCAL_ALERT'
export const CHANGE_ALL_LOCAL_STATUS = 'CHANGE_ALL_LOCAL_STATUS'
export const DELETE_ALL_LOCAL_ALERT = 'DELETE_ALL_LOCAL_ALERT'

export default {
    [SET_PER_INFO](state, info) {
        state.personalInfo = info
    },
    [SET_RECEIVE](state, info) {
        state.mailReceive = info
        // console.log('啊啊啊'+JSON.stringify(state.mailReceive))
    },
    [SET_PUBLISHING](state, info) {
        state.publishing = info
        console.log('publishing:' + JSON.stringify(state.publishing))
    },
    [SET_ATTENDING](state, info) {
        state.attending = info
    },
    [SET_STARRING](state, info) {
        state.starring = info
    },
    [SET_DETAIL](state, detail) {
        state.quesDetail = detail
    },
    [CHANGE_LOCAL_STATUS](state, index) {
        state.mailReceive[index].hasRead = !state.mailReceive[index].hasRead
        // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
    },
    [CHANGE_ALL_LOCAL_STATUS](state, index) {
        for (let i = 0; i < state.mailReceive.length; ++i) {
            state.mailReceive[i].hasRead = true
        }
        // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
    },
    [DELETE_LOCAL_ALERT](state, index) {
        state.mailReceive.splice(index, 1)
    },
    [DELETE_ALL_LOCAL_ALERT](state) {
        state.mailReceive.splice(0, state.mailReceive.length)
    }
}