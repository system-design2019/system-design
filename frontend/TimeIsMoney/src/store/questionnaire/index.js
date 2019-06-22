import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import fillQues from './fill/fill.js'
import checkQues from './check/check.js'

Vue.use(Vuex)


const Ques = {
    namespaced:true,
    state: {
        username: '',
        quesList:[],
        quesDetail: {
            Infos:{"招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00'},
            quesid: 0, number:0, publisherName:'suata', head:'../../static/jump/social.png', title:'大学生心理健康调查', content:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', command:'在校大学生', price: 10
        },
        collectQuesList:[],
        attendQuesList:[],
        publishQuesList:[],
    },
    actions,
    mutations,
    getters,
    modules: {
        createQues: {
            namespaced: true,
            state: {
                formValidate: {
                    detail: '',
                    command:'',
                    reward: 0,
                    quantity: 0,
                    info:[],
                    startdate: '',
                    starttime: '',
                    enddate: '',
                    endtime: '',
                    number:  0
                },
                formContent:{
                    title:'aaaaaaaa',
                    number: 2,
                    tians:[
                        {mode: 1, theorder: 1, title:'试试', fill:false}
                    ],
                    xuans:[
                        {mode: 2, theorder: 2, title:'试试', choose:1, choices:['选项1', '选项2'], fill:false}
                    ]
                },
                questions:[{mode: 1, theorder: 1, tianID: 1, title:'试试', fill:false}, {mode: 2, theorder: 2, title:'试试', xuanID: 1, choose:1, choices:['选项1', '选项2'], fill:false}]
            },
            actions:{
                
            },
            mutations:{
                SET_VALIDATE (state, formValidate){
                    state.formValidate = formValidate
                    // 传到服务器
                    // commit('')
                    // commit(COMMIT_QUES, formValidate)
                },
                SET_CONTENT (state, content){
                    state.formContent = content
                },
                CLEAR(state){
                    state.formContent = {
                        title:'aaaaaaaa',
                        number: 2,
                        fillings:[
                            {mode: 1, theorder: 1, tianID: 1, title:'试试', fill:false},
                        ],
                        chooses:[
                            {mode: 2, theorder: 2, xuanID: 1, title:'试试', choose:1, choices:['选项1', '选项2'], fill:false}
                        ]
                    }
                    state.formValidate = {
                        detail: '',
                        command:'',
                        reward: 0,
                        quantity: 0,
                        info:[],
                        startdate: '',
                        starttime: '',
                        enddate: '',
                        endtime: '',
                        number:  0
                    }
                }
            }
        },
        fillQues: fillQues,
        checkQues: checkQues
    }
}

export default Ques