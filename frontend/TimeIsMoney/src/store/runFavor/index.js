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
        favorList:[],
        collectFavorList:[],
        attendFavorList:[],
        publishFavorList:[],
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
                    time: '',
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
                SET_VALIDATE (state, formValidate){
                    state.formValidate = formValidate
                },
                SET_CONTENT (state, content){
                    state.formContent = content
                },
                CLEAR(state){
                    state.favorContent = {
                        title: '',
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