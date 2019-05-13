import Vue from 'vue'
import Vuex from 'vuex'
import * as quesAPI from './../../../api/question.js'

Vue.use(Vuex)
const fillQues = {
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
                    quesAPI.getQuesContent(id).then((formContent)=>{
                        commit('SET_QUES_CONTENT', formContent)
                        commit('SET_QUES_ANSWERS', formContent)
                        commit('SET_QUES_RULES', formContent)
                    })
                    
                },
                POST_QUES(userid, quesid, answer){
                    quesAPI.commitAns(userid, quesid, answer).then((response) => {
                        if(!response.success){
                            console.log('wrong')
                        }
                    })
                    return true;
                }
            },
            getters:{
                formContent: (state, getters) => {
                    return state.formContent
                }
            }
        }
export default fillQues