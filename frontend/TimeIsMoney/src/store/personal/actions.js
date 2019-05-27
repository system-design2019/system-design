import * as mutations from './mutations.js'
import * as personalAPI from './../../api/personal.js'

export const GET_INFO = 'GET_INFO'
export const GET_ATTEND = 'GET_ATTEND'
export const GET_STAR = 'GET_STAR'
export const GET_ALERTS = 'GET_ALERTS'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const DELETE_ALERT = 'DELETE_ALERT'

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
            // console.log('噢噢'+JSON.stringify(response.data))
            commit(mutations.SET_STARRING, response)
        })
    },
    [GET_ALERTS] ({commit}, id) {
        personalAPI.getAlerts().then((response)=>{
            commit(mutations.SET_RECEIVE, response.data)
        })
    },
    [CHANGE_STATUS] ({state, commit}, index) {
        let data = [{
            id: state.mailReceive[index].id,
            toId:state.mailReceive[index].toId,
            fromId:state.mailReceive[index].fromId,
            date:state.mailReceive[index].date,
            hasRead:!state.mailReceive[index].hasRead,
            title:state.mailReceive[index].title,
            content: state.mailReceive[index].content
        }]
        personalAPI.changeAlertStatusById(data).then((response)=>{
            commit(mutations.CHANGE_LOCAL_STATUS, index)
        })
        
    },

    [DELETE_ALERT] ({state, commit}, index) {
        let data = [{
            id: state.mailReceive[index].id,
            toId:state.mailReceive[index].toId,
        }]
        personalAPI.deleteAlertById(data).then((response)=>{
            commit(mutations.DELETE_LOCAL_ALERT, index)
        })
        
    }
}