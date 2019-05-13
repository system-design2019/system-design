import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const Personal = {
    namespaced:true,
    state: {
        perosonalInfo:{
            username: '',
            userid: 0,
            sex: 0,
            email: '',
            phone: '',
            wechat: '',
            university:'',
            major:'',
            grade:'',
            studentid:'',
            payaccount:''
        },
        attending:[],
        starring:[],
        mailReceive:[]
    },
    actions,
    mutations,
    getters
}

export default Personal