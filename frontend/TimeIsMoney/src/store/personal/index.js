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
            credit: 3,
            assst: 0

        },
        quesDetail: {
            infos: { "招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00' },
            quesid: 0,
            number: 0,
            publisher: 'suata',
            head: '../../static/jump/social.png',
            title: '大学生心理健康调查',
            content: '关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            command: '在校大学生',
            price: 10
        },
        publishing: [],
        attending: [],
        starring: [],
        mailReceive: [],
        allDeals: []
    },
    actions,
    mutations,
    getters
}

export default Personal