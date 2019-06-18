import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)


const Favor = {
    namespaced:true,
    state: {
        username: '',
        errandList:[],
        errandDetail:{},
        attendErrandList:[],
        publishErrandList:[],
    },
    actions,
    mutations,
    getters,
    modules: {
        createFavor: {
            namespaced: true,
            state: {
                favorContent:{
                    title: '',
                    date: '',
                    time:'',
                    place: '',
                    event: '',
                    reward: 0,
                    deposit: 0,
                    quantity: 0
                }
            },
            actions:{
                
            },
            mutations:{
                SET_CONTENT (state, content){
                    state.favorContent = content
                },
                CLEAR(state){
                    state.favorContent = {
                        title: '',
                        date: '',
                        time: '',
                        place: '',
                        event: '',
                        reward: 0,
                        deposit: 0,
                        quantity: 0
                    }
                }
            }
        }
    }
}

export default Favor