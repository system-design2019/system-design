import * as mutations from './mutations.js'
import * as personalAPI from './../../api/personal.js'

export const GET_INFO = 'GET_INFO'
export const GET_ATTEND = 'GET_ATTEND'
export const GET_STAR = 'GET_STAR'
export const GET_ALERTS = 'GET_ALERTS'

export default {
    [GET_INFO] ({commit}, id) {
        personalAPI.getPersonalInfo(id).then((response)=>{
            commit(mutations.SET_PER_INFO, response)
        })
    },
    [GET_ATTEND] ({commit}, id) {
        personalAPI.getAttending(id).then((response)=>{
            commit(mutations.SET_ATTENDING, response)
        })
    },
    [GET_STAR] ({commit}, id) {
        personalAPI.getStarring(id).then((response)=>{
            commit(mutations.SET_STARRING, response)
        })
    },
    [GET_ALERTS] ({commit}, id) {
        personalAPI.getAlerts(id).then((response)=>{
            commit(mutations.SET_RECEIVE, response)
        })
    },
}