import Vue from 'vue'
export const SET_PER_INFO = 'SET_PER_INFO'
export const SET_ATTENDING = 'SET_ATTENDING'
export const SET_STARRING = 'SET_STARRING'

export default{
    [SET_PER_INFO]  (state, info) {
        state.personalInfo = info
    },
    [SET_ATTENDING]  (state, info) {
        state.attending = info
    },
    [SET_STARRING]  (state, info) {
        state.starring = info
    }
}