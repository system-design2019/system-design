import Vue from 'vue'
export const SET_PER_INFO = 'SET_PER_INFO'
export const SET_ATTENDING = 'SET_ATTENDING'
export const SET_STARRING = 'SET_STARRING'
export const SET_RECEIVE = 'SET_RECEIVE'
export const CHANGE_STATUS = 'CHANGE_STATUS'

export default{
    [SET_PER_INFO]  (state, info) {
        state.personalInfo = info
    },
    [SET_RECEIVE]  (state, info) {
        state.mailReceive = info
    },
    [SET_ATTENDING]  (state, info) {
        state.attending = info
    },
    [SET_STARRING]  (state, info) {
        state.starring = info
    },
    [CHANGE_STATUS] (state, index) {
        state.mailReceive[index].status = 'default'
    }
}