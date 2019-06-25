import * as mutations from './mutations.js'
import * as personalAPI from './../../api/personal.js'

export const GET_INFO = 'GET_INFO'
export const UPDATE_INFO = 'UPDATE_INFO'
export const GET_PUBLISH = 'GET_PUBLISH'
export const GET_ATTEND = 'GET_ATTEND'
export const GET_STAR = 'GET_STAR'
export const GET_ALERTS = 'GET_ALERTS'
export const GET_DETAIL = 'GET_DETAIL'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const CHANGE_ALL_STATUS = 'CHANGE_ALL_STATUS'
export const DELETE_ALERT = 'DELETE_ALERT'
export const DELETE_ALL_ALERTS = 'DELETE_ALL_ALERTS'
export const RECHARGE_ASSET = 'RECHARGE_ASSET'
export const WITHDRAW_ASSET = 'WITHDRAW_ASSET'
export const GET_ASSET = 'GET_ASSET'

export default {
    [GET_INFO]({ commit }) {
        return personalAPI.getPersonalInfo().then((info) => {
            commit(mutations.SET_PER_INFO, info.data)
        })
    },
    [UPDATE_INFO]({ state, commit }) {
        let data = state.personalInfo;
        console.log("data in actions:" + data);
        personalAPI.setPersonalInfo(data).then((info) => {
            commit(mutations.SET_PER_INFO, data)
        })
    },
    [GET_PUBLISH]({ commit }) {
        personalAPI.getPublishing().then((response) => {
            commit(mutations.SET_PUBLISHING, response.data)
        })
    },
    [GET_ATTEND]({ commit }) {
        personalAPI.getAttending().then((response) => {
            commit(mutations.SET_ATTENDING, response.data)
        })
    },
    [GET_STAR]({ commit }) {
        personalAPI.getStarring().then((response) => {
            // console.log('噢噢'+JSON.stringify(response.data))
            commit(mutations.SET_STARRING, response.data)
        })
    },
    [GET_DETAIL]({ commit }, id) {
        // console.log('123456789')
        quesAPI.getDetail(id).then((info) => {
            commit(mutations.SET_DETAIL, info.data)
        })
        // console.log(data)
    },
    [GET_ALERTS]({ commit }, id) {
        personalAPI.getAlerts().then((response) => {
            commit(mutations.SET_RECEIVE, response.data)
        })
    },

    [CHANGE_STATUS]({ state, commit }, index) {
        let data = [{
            id: state.mailReceive[index].id,
            toId: state.mailReceive[index].toId,
            fromId: state.mailReceive[index].fromId,
            date: state.mailReceive[index].date,
            hasRead: !state.mailReceive[index].hasRead,
            title: state.mailReceive[index].title,
            content: state.mailReceive[index].content
        }]
        personalAPI.changeAlertStatusById(data).then((response) => {
            commit(mutations.CHANGE_LOCAL_STATUS, index)
        })

    },
    [CHANGE_ALL_STATUS]({ state, commit }) {
        personalAPI.changeAllAlertStatus().then((response) => {
            commit(mutations.CHANGE_ALL_LOCAL_STATUS)
        })

    },
    [DELETE_ALERT]({ state, commit }, index) {
        let data = [{
            id: state.mailReceive[index].id,
            toId: state.mailReceive[index].toId,
        }]
        personalAPI.deleteAlertById(data).then((response) => {
            commit(mutations.DELETE_LOCAL_ALERT, index)
        })

    },
    [DELETE_ALL_ALERTS]({ state, commit }) {
        personalAPI.deleteAllAlerts().then((response) => {
            commit(mutations.DELETE_ALL_LOCAL_ALERT)
        })
    },
    [RECHARGE_ASSET]({ state, commit }, paymentAbout) {
        let res = personalAPI.rechargeAsset(paymentAbout);
        console.log(res);
        return res;
    },
    [WITHDRAW_ASSET]({ state, commit }, paymentAbout) {
        let res = personalAPI.withdrawAsset(paymentAbout.userId, paymentAbout.money);
        console.log(res);
        return res;
    },
    [GET_ASSET]({ state, commit }) {
        personalAPI.getAllDeals().then((response) => {
            commit(mutations.UPDATE_ASSET, response.data)
        })
    }

}