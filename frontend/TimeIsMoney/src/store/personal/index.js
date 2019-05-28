import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const Personal = {
    namespaced: true,
    state: {
        personalInfo: {
            nickname: 'Yezo',
            id: 0,
            gender: 0,
            email: '123',
            phone: '123',
            qq: '123',
            university: '123',
            major: '123',
            grade: '123',
            studentId: '',
            payaccount: '',
            wechat: 'wechat',
            credit: 3
        },
        publishing: [],
        attending: [],
        starring: [],
        mailReceive: []
    },
    actions,
    mutations,
    getters
}

export default Personal