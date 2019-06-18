import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import Ques from './questionnaire/index.js'
import Favor from './runFavor/index'
import Home from './home/index'
import Personal from './personal/index'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        LogInfo: 0,
        activeNav: 0,
        navRightTags: undefined,
    },
    actions,
    mutations,
    getters,
    modules: {
        Ques,
        Favor,
        Home,
        Personal
    }
})