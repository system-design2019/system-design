import Vue from 'vue'
import Vuex from 'vuex'
import * as quesAPI from './../../../api/question.js'

Vue.use(Vuex)
const checkQues = {
            namespaced: true,
            state:{
                formContent:{
                    title:'',
                    questions:[]
                },
                answers:{},
                rules:{},
                anslist:[]
            },
            mutations:{
                SET_QUES_CONTENT (state, content){
                    state.formContent = content
                },
                SET_ANS_LIST (state, list){
                    state.anslist = list
                    // console.error(state.anslist)
                },
                SET_ANS (state, data){
                    var t = 0
                    var x = 0
                    for(let key in state.answers){
                        if(typeof(state.answers[key]) == 'string'){
                            state.answers[key] = data.tiankong[t]
                            t++
                        }
                        else{
                            state.answers[key] = data.xuanze[x].split(',')
                            x++
                        }
                    }
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
                }
            },
            actions:{
                GET_QUES({commit}, id){
                    
                    quesAPI.getQuesContent(id).then((response)=>{
                        if(response.success){
                            commit('SET_QUES_CONTENT', response.formContent)
                            commit('SET_QUES_ANSWERS', response.formContent)
                        }
                        else{
                            alert("获取问卷失败请稍后重试")
                        }
                    })
                    
                },
                GET_ANS_LIST({commit}, quesid){
                    
                    quesAPI.getAnsListByQuesId(quesid).then((response)=>{
                        if(response.success){
                            commit('SET_ANS_LIST', response.data)
                        }
                        else{
                            alert("获取填写情况失败请稍后重试")
                        }
                    })
                },
                GET_ANS({commit}, data){
                    quesAPI.getAnsByQUId(data.quesid, data.userid).then((response)=>{
                        if(response.success){
                            commit('SET_ANS', response.data)
                        }
                        else{
                            alert("获取填写情况失败请稍后重试")
                        }
                    })
                }
            },
            getters:{
                formContent: (state, getters) => {
                    return state.formContent
                }
            }
        }
export default checkQues