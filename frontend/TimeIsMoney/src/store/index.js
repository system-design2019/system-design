import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import Ques from './questionnaire/index'
import Run from './runFavor/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        name: '',
        // userType: 'user',
        activeNav: undefined,
        navRightTags: undefined,
        navLeftTags:[
            {name: "1", icon:"md-home", text:"首页", link: "home"},
            {name: "2", icon:"md-paper", text:"问卷", link: "questionnaire"},
            {name: "3", icon:"md-walk", text:"跑腿", link: "favor"}
        ]
      },
    actions,
    mutations,
    getters,
    // getters: {
    //     getRightNavs: (state) => {
    //         let logged = state.isAuthenticated
    //         let unsigned = [{name: "6", icon:"md-person", text:"登录/注册", link: "in"}]
    //         let signed = [
    //           {name: "4", icon:"md-mail", text:"收件箱", link: "receiveBox"},
    //           {name: "5", icon:"md-person", text:"个人中心", link: "personal"}
    //         ]
                            
    //         if(logged){
    //           return signed
    //         }
    //         else{
    //           return unsigned
    //         }
    //     }
    // },
    modules: {
        Ques,
        Run
    }
})