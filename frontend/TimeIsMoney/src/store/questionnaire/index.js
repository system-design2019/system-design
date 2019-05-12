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
            quesid: 0, number:0, publisher:'suata', head:'../../static/jump/social.png', title:'大学生心理健康调查', content:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', command:'在校大学生', price: 10
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
                    reward: 0,
                    // gender: '',
                    quantity: 0,
                    info:[],
                    startdate: '',
                    starttime: '',
                    enddate: '',
                    endtime: '',
                    number:  0
                    // desc: ''
                },
                formContent:{
                    title:'aaaaaaaa',
                    number: 2,
                    questions:[
                        {mode: 1, title:'试试', fill:false},
                        {mode: 2, title:'试试', choose:1, choices:['选项1', '选项2'], fill:false}
                    ]
                }
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
                }
            }
        },
        fillQues:{
            namespaced: true,
            state:{
                formContent:{
                    title:'',
                    questions:[]
                },
                answers:{},
                rules:{}
            },
            mutations:{
                SET_QUES_CONTENT (state, content){
                    state.formContent = content
                },
                SET_QUES_ANSWERS (state, formContent){
                    let answers = {}
                    for(let i = 0; i < formContent.questions.length; ++i){
                        var name = 'answer' + String(i+1)
                        if(formContent.questions[i].mode === 1){
                            answers[name] = ''
                        }
                        else{
                            answers[name] = []
                        }
                    }
                    state.answers = answers
                },
                SET_QUES_RULES (state, formContent){
                    let rules = {}
                    for(let i = 0; i<formContent.questions.length; ++i){
                        let key = 'answer'+String(i+1)
                        if(formContent.questions[i].mode === 1){
                            rules[key] = [{ required: formContent.questions[i].fill, message: 'Please fill in', trigger: 'change' }]
                        }
                        else{
                            rules[key] = [
                                { required: formContent.questions[i].fill, type: 'array', min:1, message: 'Choose at least one option', trigger: 'blur' },
                                { type: 'array', max: formContent.questions[i].maxchoose, message: 'You can choose '+String(formContent.questions[i].maxchoose)+'at most', trigger: 'blur' }
                            ]
                        }
                    }
                    state.rules = rules
                }
            },
            actions:{
                SET_FILL_QUES({commit}, id){
                    let formContent = {
                        title:'aaaaaaa',
                        questions:[
                            {mode: 1, title:'试试',fill:true},
                            {mode: 2, title:'试试', maxchoose: 1, choices:['选项1', '选项2'], fill:false}
                        ]
                    }                    
                    commit('SET_QUES_CONTENT', formContent)
                    commit('SET_QUES_ANSWERS', formContent)
                    commit('SET_QUES_RULES', formContent)
                },
                POST_QUES(){
                    return true;
                }
            },
            getters:{
                formContent: (state, getters) => {
                    return state.formContent
                }
            }
        }
    }
}

export default Ques