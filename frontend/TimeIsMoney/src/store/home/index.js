import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const Home = {
    namespaced:true,
    state: {
        rankList: [],
        advertises: []
    },
    actions,
    mutations,
    getters
}

export default Home