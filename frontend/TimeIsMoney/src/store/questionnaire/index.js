import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const Ques = {
    namespaced:true,
    state: {
        username: '',
        quesList:[],
        quesDetail: {
            infos:{"招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00'},
            creator:'suata', head:'../../static/jump/social.png', title:'大学生心理健康调查', text:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', command:'在校大学生', price: 10
        }
    },
    actions,
    mutations,
    getters,
    modules: {
        createQues: {
            namespaced: true,
            state: {
                formValidate: {
                    title: '1111',
                    detail: '',
                    command:'',
                    reward: '',
                    // gender: '',
                    quantity:'',
                    info:[],
                    startdate: '',
                    starttime: '',
                    enddate: '',
                    endtime: '',
                    number:  0
                    // desc: ''
                },
                formContent:{
                    title:'',
                    number: 0,
                    questions:[
                        {mode: 1, title:'试试', choices:[], fill:false},
                        {mode: 2, title:'试试', choices:['选项1', '选项2'], fill:false}
                    ]
                }
            },
            actions:{
                POST_QUESTIONNAIRE ({state, commit, rootState}, formValidate){
                    state.formValidate = formValidate
                    // 传到服务器
                    // commit('')
                    // commit(COMMIT_QUES, formValidate)
                }
            }
        }
    }
}

export default Ques