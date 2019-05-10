export const SET_RANKLIST = 'SET_RANKLIST'
export const SET_ADVERTISES = 'SET_ADVERTISES'

export default{
    SET_RANKLIST (state, list) {
        state.rankList = list
    },
    SET_ADVERTISES (state, list) {
        state.advertises = list
    }
}