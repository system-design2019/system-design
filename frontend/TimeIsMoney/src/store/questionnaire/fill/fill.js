import Vue from 'vue'
import Vuex from 'vuex'
import * as quesAPI from './../../../api/question.js'

function getTime(){
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
        + " "  + date.getHours()  + seperator2  + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate
}


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
                    console.error(rules)
                    state.rules = rules
                }
            },
            actions:{
                SET_FILL_QUES({commit}, id){
                    quesAPI.getQuesContent(id).then((response)=>{
                        // console.error(response)
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
                POST_QUES({commit},data){
                    let com = {
                        quesID: data.quesid,
                        userID: data.userid,
                        createTime: getTime(),
                        tiankong: [],
                        xuanze: []
                    }
                    for(var i = 0; i < data.number; ++i){
                        if(typeof(data.answer['answer'+String(i+1)]) == 'string'){
                            com.tiankong.push(data.answer['answer'+String(i+1)])
                        }
                        else{
                            com.xuanze.push(data.answer['answer'+String(i+1)].join(','))
                        }
                    }
                    let response = quesAPI.commitAns(com)
                    return response
                    
                }
            },
            getters:{
                formContent: (state, getters) => {
                    return state.formContent
                }
            }
        }
export default fillQues