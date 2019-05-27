import Vue from 'vue'
export const SET_PER_INFO = 'SET_PER_INFO'
export const SET_ATTENDING = 'SET_ATTENDING'
export const SET_STARRING = 'SET_STARRING'
export const SET_RECEIVE = 'SET_RECEIVE'
export const CHANGE_LOCAL_STATUS = 'CHANGE_LOCAL_STATUS'
export const DELETE_LOCAL_ALERT = 'DELETE_LOCAL_ALERT'

export default{
    [SET_PER_INFO]  (state, info) {
        state.personalInfo = info
    },
    [SET_RECEIVE]  (state, info) {
        state.mailReceive = info
        // console.log('啊啊啊'+JSON.stringify(state.mailReceive))
    },
    [SET_ATTENDING]  (state, info) {
        state.attending = info
    },
    [SET_STARRING]  (state, info) {
        state.starring = info
    },
    [CHANGE_LOCAL_STATUS] (state, index) {
        state.mailReceive[index].hasRead = !state.mailReceive[index].hasRead
        // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
    },
    [DELETE_LOCAL_ALERT] (state, index) {
        state.mailReceive.split(index, 1)
        // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
    }
}