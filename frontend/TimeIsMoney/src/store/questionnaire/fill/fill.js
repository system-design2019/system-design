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
                                { type: 'array', max: formContent.questions[i].choose, message: 'You can choose '+String(formContent.questions[i].choose)+'at most', trigger: 'blur' }
                            ]
                        }
                    }
                    state.rules = rules
                }
            },
            actions:{
                SET_FILL_QUES({commit}, id){
                    quesAPI.getQuesContent(id).then((response)=>{
                        // console.log(formContent)
                        if(response.success){
                            commit('SET_QUES_CONTENT', response.formContent)
                            commit('SET_QUES_ANSWERS', response.formContent)
                            commit('SET_QUES_RULES', response.formContent)
                        }
                        else{
                            alert("获取失败请稍后重试")
                        }
                        
                    })
                    
                },
                POST_QUES(userid, quesid, answer){
                    let data = {
                        quesID: quesid,
                        userID: userid,
                        tiankong: [],
                        xuanze: []
                    }
                    for(let i = 0; i < answer.length; ++i){
                        if(typeof(answer[i]) == 'string'){
                            data.tiankong.push(answer[i])
                        }
                        else{
                            data.xuanze.push(answer[i].join(','))
                        }
                    }
                    quesAPI.commitAns(data).then((response) => {
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